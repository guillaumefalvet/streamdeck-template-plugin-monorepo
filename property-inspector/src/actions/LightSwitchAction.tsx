/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from 'react';

// - Types
import { ParsedProps } from '../types/streamDeck';

// - Hooks
import { useWebSocket } from '../hooks/useWebSocket';

export default function LightSwitchAction(props: ParsedProps) {
  const { websocket } = useWebSocket();
  const [isOn, setIsOn] = useState<boolean>(false);

  useEffect(() => {
    if (websocket) {
      websocket.onmessage = (event: any) => {
        const json = JSON.parse(event.data);
        if (json.event === 'didReceiveSettings') {
          return setIsOn(json.payload.settings.onOff);
        }
      };
    }
  }, [websocket]);

  function sendValueToPlugin(value: boolean) {
    if (websocket) {
      const json = {
        action: props.inActionInfo.action,
        event: 'sendToPlugin',
        context: props.inUUID,
        payload: {
          onOff: value,
        },
      };
      websocket.send(JSON.stringify(json));
    }
  }

  function handleLightSwitchChange() {
    setIsOn(isOn => !isOn);
    sendValueToPlugin(!isOn);
  }

  return (
    <div className="sdpi-wrapper">
      <div className="sdpi-item">
        <div className="sdpi-item-label">Light Switch</div>
        <input
          className="sdpi-item-value"
          id="chk0"
          type="checkbox"
          value="left"
          checked={isOn}
          onChange={handleLightSwitchChange}
        />
        <label htmlFor="chk0"><span></span></label>
      </div>
    </div>
  );
}
