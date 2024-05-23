import {
	action,
	KeyDownEvent,
	SingletonAction,
	WillAppearEvent,
	SendToPluginEvent,
	WillDisappearEvent
} from "@elgato/streamdeck";
import { CounterSettings, INCREMENT_COUNTER_UUID } from "@shared/lib";
import { WebSocket } from "ws";

// - Constants
/**
 * An example action class that displays a count that increments by one each time the button is pressed.
 */
@action({ UUID: INCREMENT_COUNTER_UUID })
export class IncrementCounter extends SingletonAction<CounterSettings> {
	ws = new WebSocket("ws://localhost:4001");
	constructor() {
		super();
		this.ws.on("open", () => {
			this.ws.send(`PLUGIN:${INCREMENT_COUNTER_UUID}`);
		});
	}
	/**
	 * The {@link SingletonAction.onWillAppear} event is useful for setting the visual representation of an action when it become visible. This could be due to the Stream Deck first
	 * starting up, or the user navigating between pages / folders etc.. There is also an inverse of this event in the form of {@link streamDeck.client.onWillDisappear}. In this example,
	 * we're setting the title to the "count" that is incremented in {@link IncrementCounter.onKeyDown}.
	 */
	onWillAppear(ev: WillAppearEvent<CounterSettings>): void | Promise<void> {
		this.ws.send(JSON.stringify(`PLUGIN onWillAppear`));
		return ev.action.setTitle(`${ev.payload.settings.count ?? 0}`);
	}

	onWillDisappear(ev: WillDisappearEvent<CounterSettings>): void | Promise<void> {
		this.ws.send(JSON.stringify(`PLUGIN onWillDisappear`));

	}
	/**
	 * Listens for the {@link SingletonAction.onKeyDown} event which is emitted by Stream Deck when an action is pressed. Stream Deck provides various events for tracking interaction
	 * with devices including key down/up, dial rotations, and device connectivity, etc. When triggered, {@link ev} object contains information about the event including any payloads
	 * and action information where applicable. In this example, our action will display a counter that increments by one each press. We track the current count on the action's persisted
	 * settings using `setSettings` and `getSettings`.
	 */
	async onKeyDown(ev: KeyDownEvent<CounterSettings>): Promise<void> {
		// Determine the current count from the settings.
		let count = ev.payload.settings.count ?? 0;
		count++;
		await ev.action.setSettings({ count });
		await ev.action.setTitle(`${count}`);
	}
	/**
	 * Listens for the {@link SingletonAction.onSendToPlugin} event which is emitted by Stream Deck when an action sends a payload to the plugin. This can be triggered by the action itself
	 * or another action. In this example, we're setting the title to the "count" that is sent from the action.
	 */
	async onSendToPlugin(ev: SendToPluginEvent<CounterSettings, CounterSettings>): Promise<void> {
		await ev.action.setSettings(ev.payload);
		await ev.action.setTitle(`${ev.payload.count}`);
	}
}
