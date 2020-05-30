import { combineReducers } from 'redux';

import { reducer as server, initialState as serverState } from './server';
import { reducer as stats, initialState as statsState } from './stats';
import { reducer as steam, initialState as steamState } from './steam';

export const initialState = {
  server: serverState,
  stats: statsState,
  steam: steamState
};

export default combineReducers({
  server,
  stats,
  steam
});
