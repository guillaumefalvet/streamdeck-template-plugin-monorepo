import React, { createContext, useContext, useState, useEffect } from 'react';

// - Types
import { ParsedProps } from '../types/streamDeck';


interface WebSocketContextProps {
  websocket: WebSocket | null;
  wsLog: WebSocket | null;
}

const WebSocketContext = createContext<WebSocketContextProps | undefined>(undefined);

export function WebSocketProvider({ children, props } : { children: React.ReactNode, props: ParsedProps }) {
  const [websocket, setWebSocket] = useState<WebSocket | null>(null);
  const [wsLog, setWsLog] = useState<WebSocket | null>(null);

  useEffect(() => {
    const streamDeckWs = new WebSocket(`ws://localhost:${props.inPort}`);
    const logger = new WebSocket(`ws://localhost:4001`);
    setWebSocket(streamDeckWs);
    setWsLog(logger);

    const registerJson = {
      event: props.inRegisterEvent,
      uuid: props.inUUID,
    };

    streamDeckWs.onopen = () => {
      const getSettingsRequest = {
        event: 'getSettings',
        context: props.inUUID
      };
      streamDeckWs.send(JSON.stringify(registerJson));
      streamDeckWs.send(JSON.stringify(getSettingsRequest));
    };

    logger.onopen = () => {
      logger.send(JSON.stringify(`Mounted ${props.inActionInfo.action}`));
    };

    return () => {
      streamDeckWs.close();
      logger.close();
    };
  }, [props.inPort, props.inRegisterEvent, props.inUUID, props.inActionInfo]);

  return (
    <WebSocketContext.Provider value={{ websocket, wsLog }}>
      {children}
    </WebSocketContext.Provider>
  );
}

export function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (context === undefined) {
    throw new Error('useWebSocket must be used within a WebSocketProvider');
  }
  return context;
}
