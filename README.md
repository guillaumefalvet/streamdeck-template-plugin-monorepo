
<p align="center">
    <h1 align="center">Stream Deck Plugin Template</h1>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/GNU%20Bash-4EAA25.svg?style=flat&logo=GNU-Bash&logoColor=white" alt="GNU%20Bash">
	<img src="https://img.shields.io/badge/JavaScript-F7DF1E.svg?style=flat&logo=JavaScript&logoColor=black" alt="JavaScript">
	<img src="https://img.shields.io/badge/HTML5-E34F26.svg?style=flat&logo=HTML5&logoColor=white" alt="HTML5">
	<img src="https://img.shields.io/badge/Vite-646CFF.svg?style=flat&logo=Vite&logoColor=white" alt="Vite">
	<img src="https://img.shields.io/badge/React-61DAFB.svg?style=flat&logo=React&logoColor=black" alt="React">
	<img src="https://img.shields.io/badge/ESLint-4B32C3.svg?style=flat&logo=ESLint&logoColor=white" alt="ESLint">
	<br>
	<img src="https://img.shields.io/badge/tsnode-3178C6.svg?style=flat&logo=ts-node&logoColor=white" alt="tsnode">
	<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat&logo=TypeScript&logoColor=white" alt="TypeScript">
	<img src="https://img.shields.io/badge/GitHub%20Actions-2088FF.svg?style=flat&logo=GitHub-Actions&logoColor=white" alt="GitHub%20Actions">
	<img src="https://img.shields.io/badge/JSON-000000.svg?style=flat&logo=JSON&logoColor=white" alt="JSON">
	<img src="https://img.shields.io/badge/Express-000000.svg?style=flat&logo=Express&logoColor=white" alt="Express">
</p>
<hr>

## Requirements

- Node.js version 20
- pnpm package manager

---
## Getting Started
### Installation
```bash
pnpm install
npm run build
```

### Development

#### Windows or MacOS
You can use the Elgato Command Line Interface (CLI) to link the plugin in this directory to the Stream Deck's plugins folder:
```bash
npx sd link com.falvet-guillaume.template-plugin-ws.sdPlugin
```

#### Linux
For Linux development, you can set up a Windows virtual machine with the following configurations:
- USB passthrough
- Shared folder
- Symlink the plugin folder in this directory with the Stream Deck plugin folder on Windows (refer to [link-win.bat](./link-win.bat) for guidance).
---
## More Information

For further information and resources, visit [Elgato's Website](https://docs.elgato.com/sdk/plugins/getting-started).
