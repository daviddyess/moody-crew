import { buildActions } from '../../utils';

export const types = buildActions('server', [
  'REQUEST_CSS_SERVER_STATUS',
  'REQUEST_CSS_SERVER_STATUS_LOADING',
  'REQUEST_CSS_SERVER_STATUS_SUCCESS',
  'REQUEST_CSGO_SERVER_STATUS',
  'REQUEST_CSGO_SERVER_STATUS_LOADING',
  'REQUEST_CSGO_SERVER_STATUS_SUCCESS',
  'REQUEST_FAILURE'
]);

const requestCSSServerStatus = (server) => ({
  type: types.REQUEST_CSS_SERVER_STATUS,
  server
});

const requestCSSServerStatusLoading = (status) => ({
  type: types.REQUEST_CSS_SERVER_STATUS_LOADING,
  status
});

const requestCSSServerStatusSuccess = (server) => ({
  type: types.REQUEST_CSS_SERVER_STATUS_SUCCESS,
  server
});

const requestCSGOServerStatus = (server) => ({
  type: types.REQUEST_CSGO_SERVER_STATUS,
  server
});

const requestCSGOServerStatusLoading = (status) => ({
  type: types.REQUEST_CSGO_SERVER_STATUS_LOADING,
  status
});

const requestCSGOServerStatusSuccess = (server) => ({
  type: types.REQUEST_CSGO_SERVER_STATUS_SUCCESS,
  server
});

const requestFailure = (error) => ({
  type: types.REQUEST_FAILURE,
  error
});

export const actions = {
  requestCSSServerStatus,
  requestCSSServerStatusLoading,
  requestCSSServerStatusSuccess,
  requestCSGOServerStatus,
  requestCSGOServerStatusLoading,
  requestCSGOServerStatusSuccess,
  requestFailure
};

export const initialState = {
  css: {},
  csgo: {},
  cssLoading: false,
  csgoLoading: false
};

export const reducer = (state = initialState, action = {}) => {
  switch (action.type) {
    case types.REQUEST_CSS_SERVER_STATUS_LOADING:
      return {
        ...state,
        cssLoading: action.status
      };
    case types.REQUEST_CSS_SERVER_STATUS_SUCCESS:
      return {
        ...state,
        css: action.server,
        cssLoading: false
      };
    case types.REQUEST_CSGO_SERVER_STATUS_LOADING:
      return {
        ...state,
        csgoLoading: action.status
      };
    case types.REQUEST_CSGO_SERVER_STATUS_SUCCESS:
      return {
        ...state,
        csgo: action.server,
        csgoLoading: false
      };
    case types.REQUEST_FAILURE:
      return {
        ...state,
        error: action.error,
        cssLoading: false,
        csgoLoading: false
      };
    default:
      return state;
  }
};
