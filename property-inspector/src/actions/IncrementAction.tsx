/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';

// - Types
import { ParsedProps } from '../types/streamDeck';

// - Hooks
import { useWebSocket } from '../hooks/useWebSocket';

// - Shared
import { CounterSettings } from 'shared';

export default function IncrementAction(props: ParsedProps) {
  const { websocket } = useWebSocket();
  const [counter, setCounter] = useState<CounterSettings>({ count: 0 });

  useEffect(() => {
    if (websocket) {
      websocket.onmessage = (event: any) => {
        const json = JSON.parse(event.data);
        if (json.event === 'didReceiveSettings') {
          return setCounter((prev) => ({ ...prev, ...json.payload.settings }));
        }
      };
    }
  }, [websocket]);

  function sendValueToPlugin(count: CounterSettings) {
    if (websocket) {
      const json = {
        action: props.inActionInfo.action,
        event: 'sendToPlugin',
        context: props.inUUID,
        payload: count,
      };
      websocket.send(JSON.stringify(json));
    }
  }

  function handleIncrement(event: React.ChangeEvent<HTMLSelectElement>) {
    const newValue = event.target.value;
    setCounter((prev) => ({ ...prev, count: +newValue }));
    sendValueToPlugin({ count: +newValue });
  }

  return (
    <div className="sdpi-wrapper">
      <div className="sdpi-item">
        <div className="sdpi-item-label">Change Value</div>
        <p>{counter.count}</p>
        <select className="sdpi-item-value" value={counter.count} onChange={handleIncrement}>
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
