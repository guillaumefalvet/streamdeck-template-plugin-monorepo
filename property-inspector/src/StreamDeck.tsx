/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';

interface Props {
  inPort: number;
  inUUID: string;
  inRegisterEvent: string;
  inInfo: string;
  inActionInfo: string;
}

const StreamDeckComponent: React.FC<Props> = ({ inPort, inUUID, inRegisterEvent, inInfo, inActionInfo }) => {
  const [websocket, setWebSocket] = useState<WebSocket | null>(null);
  const [ws_logger, setWs] = useState<WebSocket | null>(null);
  const [uuid, setUuid] = useState<string>(inUUID);
  const [actionInfo, setActionInfo] = useState<any>(JSON.parse(inActionInfo));
  const [value, setValue] = useState<string>('0');

  useEffect(() => {
    const streamDeckWs = new WebSocket(`ws://localhost:${inPort}`);
    const logger = new WebSocket(`ws://localhost:4001`);
    setWebSocket(streamDeckWs);
    setWs(logger);

    const registerJson = {
      event: inRegisterEvent,
      uuid: inUUID,
    };

    streamDeckWs.onopen = (ev) => {
      const getSettingsRequest = {
        event: 'getSettings',
        context: inUUID
      };
      streamDeckWs.send(JSON.stringify(registerJson));
      streamDeckWs.send(JSON.stringify(getSettingsRequest));
  };
    streamDeckWs.onmessage = (event) => {
      const json = JSON.parse(event.data);
      logger.send(JSON.stringify(`PI EVENT, ${JSON.stringify(json.event)}`));
      if (json.event === 'didReceiveSettings') {
        logger.send(JSON.stringify(`PI didReceiveSettings, ${JSON.stringify(json)}`));
        return setValue(json.payload.settings.count.toString());
      }
    }

    logger.onopen = () => {
      logger.send(JSON.stringify(registerJson));
    };

    return () => {
      streamDeckWs.close();
      logger.close();
    };
  }, [inPort, inRegisterEvent, inUUID]);

  const sendValueToPlugin = (value: string) => {
    if (websocket && ws_logger) {
      const json = {
        action: actionInfo['action'],
        event: 'sendToPlugin',
        context: uuid,
        payload: {
          count: +value,
        },
      };
      websocket.send(JSON.stringify(json));
      ws_logger.send(JSON.stringify(json));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = event.target.value;
    setValue(newValue);
    sendValueToPlugin(newValue);
  };

  return (
    <div className="sdpi-wrapper">
      <div className="sdpi-item">
        <div className="sdpi-item-label">Change Value</div>
        <p>{value}</p>
        <select className="sdpi-item-value" value={value} onChange={handleChange}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i} value={i.toString()}>
              {i}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default StreamDeckComponent;
