/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';

// - Types
import { ParsedProps } from '../types/streamDeck';

// - Hooks
import { useWebSocket } from '../hooks/useWebSocket';

export default function IncrementAction(props: ParsedProps) {
  const { websocket } = useWebSocket();
  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    if (websocket) {
      websocket.onmessage = (event: any) => {
        const json = JSON.parse(event.data);
        if (json.event === 'didReceiveSettings') {
          return setValue(json.payload.settings.count);
        }
      };
    }
  }, [websocket]);

  function sendValueToPlugin(value: number) {
    if (websocket) {
      const json = {
        action: props.inActionInfo.action,
        event: 'sendToPlugin',
        context: props.inUUID,
        payload: {
          count: value,
        },
      };
      websocket.send(JSON.stringify(json));
    }
  }

  function handleIncrement(event: React.ChangeEvent<HTMLSelectElement>) {
    const newValue = event.target.value;
    setValue(+newValue);
    sendValueToPlugin(+newValue);
  }

  return (
    <div className="sdpi-wrapper">
      <div className="sdpi-item">
        <div className="sdpi-item-label">Change Value</div>
        <p>{value}</p>
        <select className="sdpi-item-value" value={value} onChange={handleIncrement}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
