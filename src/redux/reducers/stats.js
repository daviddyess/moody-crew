import { buildActions } from '../../utils';

export const types = buildActions('stats', [
  'REQUEST_PLAYER',
  'REQUEST_PLAYER_SUCCESS',
  'REQUEST_STATS',
  'REQUEST_STATS_LOADING',
  'REQUEST_STATS_SUCCESS',
  'REQUEST_FAILURE'
]);

const requestPlayer = (player) => ({
  type: types.REQUEST_PLAYER,
  player
});

const requestPlayerSuccess = (player, cache) => ({
  type: types.REQUEST_PLAYER_SUCCESS,
  player,
  cache
});

const requestStats = (stats) => ({
  type: types.REQUEST_STATS,
  stats
});

const requestStatsLoading = (status) => ({
  type: types.REQUEST_STATS_LOADING,
  status
});

const requestStatsSuccess = (pager, stats, cache) => ({
  type: types.REQUEST_STATS_SUCCESS,
  pager,
  stats,
  cache
});

const requestFailure = (error) => ({
  type: types.REQUEST_FAILURE,
  error
});
// Actions
export const actions = {
  requestPlayer,
  requestPlayerSuccess,
  requestStats,
  requestStatsLoading,
  requestStatsSuccess,
  requestFailure
};
// Initial State
// The beginning of your State, used in the
export const initialState = {
  cache: {},
  collection: [],
  loading: false,
  pager: {},
  players: {
    cache: {},
    current: {}
  }
};
// Reducer combines initialState, Types, and Actions here to define final State
export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_STATS_LOADING:
      return {
        ...state,
        loading: action.status
      };
    case types.REQUEST_PLAYER_SUCCESS:
      return {
        ...state,
        players: {
          cache: action.cache,
          current: action.player
        },
        loading: false
      };
    case types.REQUEST_STATS_SUCCESS:
      return {
        ...state,
        cache: action.cache,
        collection: action.stats,
        loading: false,
        pager: action.pager
      };
    case types.REQUEST_FAILURE:
      return {
        ...state,
        error: action.error,
        loading: false
      };
    default:
      return state;
  }
};
