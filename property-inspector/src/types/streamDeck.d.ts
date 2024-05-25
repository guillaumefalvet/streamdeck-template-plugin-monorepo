export type DeviceInfo = {
  id: string;
  name: string;
  size: {
      columns: number;
      rows: number;
  };
  type: number;
}

export type ApplicationInfo = {
  font: string;
  language: string;
  platform: string;
  platformVersion: string;
  version: string;
}

export type ColorPalette = {
  buttonPressedBackgroundColor: string;
  buttonPressedBorderColor: string;
  buttonPressedTextColor: string;
  disabledColor: string;
  highlightColor: string;
  mouseDownColor: string;
}

export type PluginInfo = {
  uuid: string;
  version: string;
}

export type ActionPayload = {
  controller: string;
  coordinates: {
      column: number;
      row: number;
  };
}
export type inInfo = {
  application: ApplicationInfo;
  colors: ColorPalette;
  devicePixelRatio: number;
  devices: DeviceInfo[];
  plugin: PluginInfo;
}
export type inActionInfo = {
  action: string;
  context: string;
  device: string;
  payload: ActionPayload;
}
export type ParsedProps = {
  inPort: number;
  inUUID: string;
  inRegisterEvent: string;
  inInfo: inInfo;
  inActionInfo: inActionInfo;
}