#!/bin/bash

# Color variables
blue_color="\033[34m"
green_color="\033[32m"
red_color="\033[31m"
yellow_color="\033[33m"
end_color="\033[00m"

# Version increment flags
increment_major=false
increment_minor=false
increment_patch=false
version=""

# Regular expression to validate version number
version_regex='^[0-9]+\.[0-9]+\.[0-9]+$'

# Function to show help
show_help() {
    echo ""
    echo -e "${green_color}-----Usage: vcli --sync <version>${end_color}"
    echo -e "${blue_color}Description: EG \"vcli --sync '2.5.6'\". This command sets the version for all packages.json (projects/lib included) and the root package.xml to 2.5.6.${end_color}"
    echo ""
    echo -e "${green_color}-----Usage: vcli --major${end_color}"
    echo -e "${blue_color}Description: This command increments the major version component (e.g., 1.2.3 becomes 2.0.0) and applies it across all relevant files.${end_color}"
    echo ""
    echo -e "${green_color}-----Usage: vcli --minor${end_color}"
    echo -e "${blue_color}Description: This command increments the minor version component (e.g., 1.2.3 becomes 1.3.0) and applies it across all relevant files.${end_color}"
    echo ""
    echo -e "${green_color}-----Usage: vcli --patch${end_color}"
    echo -e "${blue_color}Description: This command increments the patch version component (e.g., 1.2.3 becomes 1.2.4) and applies it across all relevant files.${end_color}"
}

# Check required tools
if ! command -v jq &> /dev/null; then
    echo -e "${red_color}jq could not be found. Please install jq to use this script.${end_color}"
    exit 1
fi

if ! command -v xmlstarlet &> /dev/null; then
    echo -e "${red_color}xmlstarlet could not be found. Please install xmlstarlet to use this script.${end_color}"
    exit 1
fi

# Ensure at least one argument is provided
if [[ "$#" -eq 0 ]]; then
    echo -e "${red_color}No arguments provided. See help. ${end_color}"
    show_help
    exit 1
fi

# Loop through command line arguments
while [[ "$#" -gt 0 ]]; do
    case "$1" in
        --sync)
            if [[ -n "$2" && "$2" =~ $version_regex ]]; then
                version="$2"
                shift
            elif [[ -z "$2" ]]; then
                echo -e "${red_color}Version number is missing.${end_color}"
                exit 1
            else
                echo -e "${red_color}Invalid version number format. Please use SemVer model <number>.<number>.<number>${end_color}"
                exit 1
            fi
            ;;
        --major) increment_major=true ;;
        --minor) increment_minor=true ;;
        --patch) increment_patch=true ;;
        -h|--help) show_help; exit 0 ;;
        *) echo -e "${red_color}Invalid argument: $1${end_color}"; exit 1 ;;
    esac
    shift
done

# Function to increment version
increment_version() {
    current_version=$1
    major=$(echo "$current_version" | cut -d. -f1)
    minor=$(echo "$current_version" | cut -d. -f2)
    patch=$(echo "$current_version" | cut -d. -f3)

    if $increment_major; then
        major=$((major + 1))
        minor=0
        patch=0
    elif $increment_minor; then
        minor=$((minor + 1))
        patch=0
    elif $increment_patch; then
        patch=$((patch + 1))
    fi

    echo "${major}.${minor}.${patch}"
}

# Extract and print the current version
current_version=$(jq -r '.version' package.json)
echo -e "${green_color}Current version before update: $current_version${end_color}"

# Calls the increment_version function if no version is provided
if [ -z "$version" ]; then
    version=$(increment_version $current_version)
fi

# Update root package.json version
echo -e "${blue_color}Updating root package.json to version $version...${end_color}"
jq --arg v "$version" '.version = $v' package.json > package.json.tmp && mv package.json.tmp package.json

# Loop through plugin, shared, and pi folders and update each package.json version
for folder in plugin shared property-inspector; do
    if [ -d "$folder" ]; then
            for package_json in $folder/package.json; do
                if [ -f "$package_json" ]; then
                    echo -e "${blue_color}Updating $package_json to version $version...${end_color}"
                    jq --arg v "$version" '.version = $v' "$package_json" > "$package_json.tmp" && mv "$package_json.tmp" "$package_json"
                else
                    echo -e "${yellow_color}No package.json found in $package_json${end_color}"
                fi
            done
    else
        echo -e "${yellow_color}No $folder directory found.${end_color}"
    fi
done

# Update version in package.xml
if [ -f "package.xml" ]; then
    echo -e "${blue_color}Updating package.xml to version $version...${end_color}"
    xmlstarlet ed --inplace -u '/package/version' -v "$version" package.xml
else
    echo -e "${yellow_color}No package.xml found.${end_color}"
fi

# Update version in manifest.json within the com.falvet-guillaume.template-plugin-ws.sdPlugin folder
manifest_file="com.falvet-guillaume.template-plugin-ws.sdPlugin/manifest.json"
if [ -f "$manifest_file" ]; then
    echo -e "${blue_color}Updating $manifest_file to version $version...${end_color}"
    jq --arg v "$version" '.Version = $v' "$manifest_file" > "$manifest_file.tmp" && mv "$manifest_file.tmp" "$manifest_file"
else
    echo -e "${yellow_color}No manifest.json found in com.falvet-guillaume.template-plugin-ws.sdPlugin folder.${end_color}"
fi

echo -e "${green_color}Version update complete! All version across the workspace have been synchronized to $version ${end_color}"
