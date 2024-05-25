import { lazy } from 'react';
const IncrementAction = lazy(() => import('./actions/IncrementAction'));
const LightSwitchAction = lazy(() => import('./actions/LightSwitchAction'));

// - Types
import { ParsedProps } from './types/streamDeck';

// - Shared
import { INCREMENT_COUNTER_UUID, LIGHT_SWITCH_UUID } from 'shared';


export default function RouterAction(props: ParsedProps) {

  switch (props.inActionInfo.action) {
    case INCREMENT_COUNTER_UUID:
      return <IncrementAction {...props} />
    case LIGHT_SWITCH_UUID:
      return <LightSwitchAction {...props} />
    default:
      return (
        <div>
          <img src="../../imgs/plugin/marketplace.png" alt="Unknown Action" />
        </div>
      );
  }
}

