import { createSelector } from 'reselect';
/**
 * Export Stats State
 * @param {*} state
 */
export const getStatsState = (state) => state.steam;
/**
 * Export Players Cache from Stats State
 */
export const getSteamPlayersCache = createSelector(
  getStatsState,
  (steam) => steam.cache
);
/**
 * Export Current Player from Stats State
 */
export const getSteamPlayer = createSelector(
  getStatsState,
  (steam) => steam.collection
);
/**
 * Export Loading Status from Stats State
 */
export const isSteamLoading = createSelector(
  getStatsState,
  (steam) => steam.loading
);
