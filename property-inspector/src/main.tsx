import './css/sdpi.css';
import ReactDOM from 'react-dom/client';

// - Components
import RouterAction from './router';

// - Types
import { ParsedProps } from './types/streamDeck';

// - Hooks
import { WebSocketProvider } from './hooks/useWebSocket';

/**
 * This defines a function `connectElgatoStreamDeckSocket` on the global window object. This function takes five parameters:
 * @param inPort
 * @param inUUID
 * @param inRegisterEvent
 * @param inInfo - stringified JSON object
 * @param inActionInfo - stringified JSON object
 * In summary, I define a function `connectElgatoStreamDeckSocket` that the Elgato Stream Deck software will call to register the plugin. This function parses the parameters provided by the Stream Deck software. It then renders the `RouterAction` component, which is wrapped in the `WebSocketProvider` component. The `WebSocketProvider` component is a custom hook that establishes a WebSocket connection with the Stream Deck software.
 */
window.connectElgatoStreamDeckSocket = (inPort: string, inUUID: string, inRegisterEvent: string, inInfo: string, inActionInfo: string) => {
  const parsedProps: ParsedProps = {
    inPort: parseInt(inPort),
    inUUID,
    inRegisterEvent,
    inInfo: JSON.parse(inInfo),
    inActionInfo: JSON.parse(inActionInfo),
  };
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <WebSocketProvider props={parsedProps}>
      <RouterAction {...parsedProps} />
    </WebSocketProvider>
  );
};

