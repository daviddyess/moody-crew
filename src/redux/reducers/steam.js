import { buildActions } from '../../utils';

export const types = buildActions('steam', [
  'REQUEST_STEAM_PLAYER',
  'REQUEST_STEAM_PLAYER_SUCCESS',
  'REQUEST_STEAM_LOADING',
  'REQUEST_FAILURE'
]);

const requestSteamPlayer = (player) => ({
  type: types.REQUEST_STEAM_PLAYER,
  player
});

const requestSteamPlayerSuccess = (player, cache) => ({
  type: types.REQUEST_STEAM_PLAYER_SUCCESS,
  player,
  cache
});

const requestSteamLoading = (status) => ({
  type: types.REQUEST_STEAM_LOADING,
  status
});

const requestFailure = (error) => ({
  type: types.REQUEST_FAILURE,
  error
});

export const actions = {
  requestSteamPlayer,
  requestSteamPlayerSuccess,
  requestSteamLoading,
  requestFailure
};

export const initialState = {
  cache: {},
  collection: {},
  loading: false
};

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
        cache: action.cache,
        collection: action.player,
        loading: false
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
