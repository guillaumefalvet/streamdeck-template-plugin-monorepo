# Using $(pwd) to get the full absolute path to the plugin folder
# -- MAC OS
ln -s $(pwd)/com.falvet-guillaume.template-plugin-ws.sdPlugin ~/Library/Application\ Support/com.elgato.StreamDeck/Plugins/

# -- Windows
# Note: this works inside the cmd, not on PowerShell
# %cd% gets the full absolute path to the plugin folder
# mklink /D C:\Users\%USERNAME%\AppData\Roaming\Elgato\StreamDeck\Plugins\com.example.my-plugin.sdPlugin %cd%\src\com.example.my-plugin.sdPlugin
# --

