import { createSelector } from 'reselect';
/**
 * Export Stats State
 * @param {*} state
 */
export const getStatsState = (state) => state.stats;
/**
 * Export Pager from Stats State
 */
export const getPager = createSelector(getStatsState, (stats) => stats.pager);
/**
 * Export Cache from Stats State
 */
export const getStatsCache = createSelector(
  getStatsState,
  (stats) => stats.cache
);
/**
 * Export Collection from Stats State
 */
export const getStats = createSelector(
  getStatsState,
  (stats) => stats.collection
);
/**
 * Export Players Cache from Stats State
 */
export const getPlayersCache = createSelector(
  getStatsState,
  (stats) => stats.players.cache
);
/**
 * Export Current Player from Stats State
 */
export const getPlayer = createSelector(
  getStatsState,
  (stats) => stats.players.current
);
/**
 * Export Loading Status from Stats State
 */
export const isLoading = createSelector(
  getStatsState,
  (stats) => stats.loading
);
