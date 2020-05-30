import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import { actions, types } from '../reducers/stats';
import { getPager, getPlayersCache, getStatsCache } from '../selectors/stats';
/**
 * Request Player Worker
 * @uses request to generate API url onto endpoint
 * @throws error to actions.requestFailure
 * @returns actions.requestStatsSuccess(data)
 */
function* requestPlayerWorker({ player: { id } }) {
  try {
    yield put(actions.requestStatsLoading(true));
    let cache = yield select(getPlayersCache);
    const player = cache?.[id];

    if (!player) {
      let endpoint = {};
      endpoint = {
        url: `/stats/player/${id}`,
        method: 'GET'
      };
      const result = yield call(request.execute, { endpoint });

      if (result.success) {
        const {
          response: {
            data: { data }
          }
        } = result;
        cache[id] = data;
        /**
         * Use Success Action to store data in the State
         */
        yield put(actions.requestPlayerSuccess(data, cache));
      } else if (result.error) {
        throw result.error;
      } else {
        throw new Error('Failed to fetch Stats!');
      }
    } else {
      yield put(actions.requestPlayerSuccess(player, cache));
    }
  } catch (error) {
    yield put(actions.requestFailure(error));
  }
}
/**
 * Request Stats Worker
 * @uses request to generate API url onto endpoint
 * @throws error to actions.requestFailure
 * @returns actions.requestStatsSuccess(data)
 */
function* requestStatsWorker({ stats: { page } }) {
  try {
    yield put(actions.requestStatsLoading(true));
    let pager = yield select(getPager);

    if (!pager?.count) {
      let endpoint = {};
      endpoint = {
        url: `/stats/count`,
        method: 'GET'
      };
      const counter = yield call(request.execute, { endpoint });

      if (counter.success) {
        const count = counter.response.data.data;
        pager = {
          ...pager,
          count,
          pages: count > 20 ? Math.ceil(count / 20) : 1
        };
      } else {
        throw new Error('Failed to fetch stats count!');
      }
    }

    pager = {
      ...pager,
      page
    };

    let cache = yield select(getStatsCache);
    const collection = cache?.[page];

    if (!collection) {
      let endpoint = {};
      endpoint = {
        url: `/stats/?page=${page}`,
        method: 'GET'
      };
      const result = yield call(request.execute, { endpoint });

      if (result.success) {
        const {
          response: {
            data: { data }
          }
        } = result;
        cache[page] = data;
        /**
         * Use Success Action to store data in the State
         */
        yield put(actions.requestStatsSuccess(pager, data, cache));
      } else if (result.error) {
        throw result.error;
      } else {
        throw new Error('Failed to fetch Stats!');
      }
    } else {
      yield put(actions.requestStatsSuccess(pager, collection, cache));
    }
  } catch (error) {
    yield put(actions.requestFailure(error));
  }
}

/**
 * Request Player Watcher
 */
function* requestPlayerWatcher() {
  yield takeLatest(types.REQUEST_PLAYER, requestPlayerWorker);
}

/**
 * Request Stats Watcher
 */
function* requestStatsWatcher() {
  yield takeLatest(types.REQUEST_STATS, requestStatsWorker);
}

export const workers = {
  requestPlayerWorker,
  requestStatsWorker
};

export const watchers = {
  requestPlayerWatcher,
  requestStatsWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map((watcher) => watcher()));
}
