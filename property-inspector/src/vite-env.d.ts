/// <reference types="vite/client" />

/**
 * extends the Window interface to include a new property connectElgatoStreamDeckSocket. This is necessary because connectElgatoStreamDeckSocket is not a standard property of the Window interface.
 */
interface ConnectElgatoStreamDeckSocket {
  (inPort: string, inUUID: string, inRegisterEvent: string, inInfo: string, inActionInfo: string): void;
}

interface Window {
  connectElgatoStreamDeckSocket: ConnectElgatoStreamDeckSocket;
}