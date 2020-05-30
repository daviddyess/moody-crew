import { createSelector } from 'reselect';
/**
 * Export Server Status State
 * @param {*} state
 */
export const getServerStatusState = (state) => state.server;
/**
 * Export CSS Server Status State
 */
export const getCSSServerStatus = createSelector(
  getServerStatusState,
  (server) => server.css
);
/**
 * Export CSGO Server Status State
 */
export const getCSGOServerStatus = createSelector(
  getServerStatusState,
  (server) => server.csgo
);
/**
 * Export CSS Loading Status from Server Status State
 */
export const isCSSLoading = createSelector(
  getServerStatusState,
  (server) => server.cssLoading
);

/**
 * Export CSGO Loading Status from Server Status State
 */
export const isCSGOLoading = createSelector(
  getServerStatusState,
  (server) => server.csgoLoading
);
