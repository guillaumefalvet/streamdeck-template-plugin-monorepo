import {
	action,
	KeyDownEvent,
	SingletonAction,
	WillAppearEvent,
	SendToPluginEvent
} from "@elgato/streamdeck";

// - Shared
import { LightSwitchSettings, LIGHT_SWITCH_UUID,  } from "shared";

@action({ UUID: LIGHT_SWITCH_UUID })
export class LightSwitch extends SingletonAction<LightSwitchSettings> {

	backgroundMap: Record<string, string> = {
		on: 'imgs/actions/light/green.png',
		off: 'imgs/actions/light/orange.png'
	};

	onWillAppear(ev: WillAppearEvent<LightSwitchSettings>): void | Promise<void> {
		this.setImage(ev, ev.payload.settings.onOff);
		return ev.action.setTitle(`${ev.payload.settings.onOff ?? false ? 'ON' : 'OFF'}`);
	}

	async onKeyDown(ev: KeyDownEvent<LightSwitchSettings>): Promise<void> {
		let onOff = ev.payload.settings.onOff ?? false;
		onOff = !onOff;
		await ev.action.setSettings({ onOff });
		await ev.action.setTitle(`${onOff ? 'ON' : 'OFF'}`);
		this.setImage(ev, onOff);
	}

	async onSendToPlugin(ev: SendToPluginEvent<LightSwitchSettings, LightSwitchSettings>): Promise<void> {
		await ev.action.setSettings(ev.payload);
		await ev.action.setTitle(`${ev.payload.onOff ? 'ON' : 'OFF'}`);
		this.setImage(ev, ev.payload.onOff);
	}

	private setImage(event: any, onOff: boolean){
		event.action.setImage(this.backgroundMap[onOff ? 'on' : 'off']);
	}
}
