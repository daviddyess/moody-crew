import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import { actions, types } from '../reducers/steam';
import { getSteamPlayersCache } from '../selectors/steam';
/**
 * Request Player Worker
 * @uses request to generate API url onto endpoint
 * @throws error to actions.requestFailure
 * @returns actions.requestStatsSuccess(data)
 */
function* requestSteamPlayerWorker({ player: { steam2id } }) {
  try {
    yield put(actions.requestSteamLoading(true));
    let cache = yield select(getSteamPlayersCache);
    const player = cache?.[steam2id];

    if (!player?.steamid) {
      let endpoint = {};
      endpoint = {
        url: `/steam/player/?steam2id=${steam2id}`,
        method: 'GET'
      };
      const result = yield call(request.execute, { endpoint });

      if (result.success) {
        const {
          response: {
            data: {
              data: {
                response: { players }
              }
            }
          }
        } = result;
        cache[steam2id] = players[0];
        /**
         * Use Success Action to store data in the State
         */
        yield put(actions.requestSteamPlayerSuccess(players[0], cache));
      } else if (result.error) {
        throw result.error;
      } else {
        throw new Error('Failed to fetch Stats!');
      }
    } else {
      yield put(actions.requestSteamPlayerSuccess(player, cache));
    }
  } catch (error) {
    yield put(actions.requestFailure(error));
  }
}

/**
 * Request Player Watcher
 */
function* requestSteamPlayerWatcher() {
  yield takeLatest(types.REQUEST_STEAM_PLAYER, requestSteamPlayerWorker);
}

export const workers = {
  requestSteamPlayerWorker
};

export const watchers = {
  requestSteamPlayerWatcher
};

export default function* saga() {
  yield all(Object.values(watchers).map((watcher) => watcher()));
}
