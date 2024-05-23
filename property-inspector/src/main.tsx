/* eslint-disable @typescript-eslint/no-explicit-any */
import ReactDOM from 'react-dom/client'
import StreamDeckComponent from './StreamDeck'
import './sdpi.css'
window.connectElgatoStreamDeckSocket = (inPort: number, inUUID: string, inRegisterEvent: string, inInfo: string, inActionInfo: string) => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <StreamDeckComponent
      inPort={inPort}
      inUUID={inUUID}
      inRegisterEvent={inRegisterEvent}
      inInfo={inInfo}
      inActionInfo={inActionInfo}
    />,
  )
}
