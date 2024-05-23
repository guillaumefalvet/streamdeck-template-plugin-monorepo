import fs from 'fs';
const filePath = '../../com.falvet-guillaume.template-plugin-ws.sdPlugin/manifest.json';

export function getActionUUID(action: string): string {
  const uuui = fs.readFileSync(filePath, 'utf8');
  try {
    const manifest = JSON.parse(uuui);
    return manifest.Actions.map((element: any) => {
      if (element.Name === action) return element.UUID;
    })[0];
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
  return '';
}


export function getPluginUUID(): string {
  const uuui = fs.readFileSync(filePath, 'utf8');
  try {
    const manifest = JSON.parse(uuui);
    return manifest.UUID;
  } catch (error) {
    console.error('Error parsing JSON:', error);
  }
  return '';
}