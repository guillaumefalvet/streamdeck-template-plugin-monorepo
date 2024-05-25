import streamDeck, { LogLevel } from "@elgato/streamdeck";

// - Actions
import { IncrementCounter } from "./actions/increment-counter";
import { LightSwitch } from "./actions/light-switch";

streamDeck.logger.setLevel(LogLevel.TRACE);
streamDeck.actions.registerAction(new LightSwitch())
streamDeck.actions.registerAction(new IncrementCounter())

streamDeck.connect();

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception: ", err);
  streamDeck.logger.error("Uncaught Exception: ", err);
});
