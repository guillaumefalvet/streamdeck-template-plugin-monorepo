import './css/sdpi.css';
import ReactDOM from 'react-dom/client';

// - Components
import RouterAction from './router';

// - Types
import { ParsedProps } from './types/streamDeck';

// - Hooks
import { WebSocketProvider } from './hooks/useWebSocket';


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
