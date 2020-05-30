import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import { actions, types } from '../reducers/server';
import { getCSSServerStatus, getCSGOServerStatus } from '../selectors/server';

/**
 * Request Server Status Worker
 * @uses request to generate API url onto endpoint
 * @throws error to actions.requestFailure
 * @returns actions.requestServerStatusSuccess(data)
 */
function* requestCSSServerStatusWorker({ server: { host } }) {
  try {
    yield put(actions.requestCSSServerStatusLoading(true));

    const collection = yield select(getCSSServerStatus);

    if (!collection?.name) {
      console.log('no collection');
      let endpoint = {};
      endpoint = {
        url: `/status/?host=${host}&type=css`,
        method: 'GET'
      };
      const result = yield call(request.execute, { endpoint });

      if (result.success) {
        const {
          response: {
            data: { data }
          }
        } = result;

        console.log(data);
        yield put(actions.requestCSSServerStatusSuccess(data));
      } else if (result.error) {
        throw result.error;
      } else {
        throw new Error('Failed to fetch Server Status!');
      }
    } else {
      yield put(actions.requestCSSServerStatusLoading(false));
    }
  } catch (error) {
    yield put(actions.requestFailure(error));
  }
}

/**
 * Request Server Status Worker
 * @uses request to generate API url onto endpoint
 * @throws error to actions.requestFailure
 * @returns actions.requestServerStatusSuccess(data)
 */
function* requestCSGOServerStatusWorker({ server: { host } }) {
  try {
    yield put(actions.requestCSGOServerStatusLoading(true));

    const collection = yield select(getCSGOServerStatus);

    if (!collection?.name) {
      console.log('no collection');
      let endpoint = {};
      endpoint = {
        url: `/status/?host=${host}&type=csgo`,
        method: 'GET'
      };
      const result = yield call(request.execute, { endpoint });

      if (result.success) {
        const {
          response: {
            data: { data }
          }
        } = result;

        console.log(data);
        yield put(actions.requestCSGOServerStatusSuccess(data));
      } else if (result.error) {
        throw result.error;
      } else {
        throw new Error('Failed to fetch Server Status!');
      }
    } else {
      yield put(actions.requestCSGOServerStatusLoading(false));
    }
  } catch (error) {
    yield put(actions.requestFailure(error));
  }
}

/**
 * Request Server Status Watcher
 */
function* requestCSSServerStatusWatcher() {
  yield takeLatest(
    types.REQUEST_CSS_SERVER_STATUS,
    requestCSSServerStatusWorker
  );
}

/**
 * Request Server Status Watcher
 */
function* requestCSGOServerStatusWatcher() {
  yield takeLatest(
    types.REQUEST_CSGO_SERVER_STATUS,
    requestCSGOServerStatusWorker
  );
}

export const workers = {
  requestCSSServerStatusWorker,
  requestCSGOServerStatusWorker
};

export const watchers = {
  requestCSSServerStatusWatcher,
  requestCSGOServerStatusWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map((watcher) => watcher()));
}
