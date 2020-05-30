import { all, fork } from 'redux-saga/effects';

import server from './server';
import stats from './stats';
import steam from './steam';

export default function* saga() {
  yield all([server, stats, steam].map(fork));
}
