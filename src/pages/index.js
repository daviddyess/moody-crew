import { lazy } from 'react';

export const imports = {
  Home: () => import(/* webpackChunkName: "home" */ 'pages/Home'),
  NotFound: () => import(/* webpackChunkName: "not-found" */ 'pages/NotFound'),
  Player: () => import(/* webpackChunkName: "player" */ 'pages/Player'),
  Stats: () => import(/* webpackChunkName: "stats" */ 'pages/Stats')
};

export const Home = lazy(imports.Home);
export const NotFound = lazy(imports.NotFound);
export const Player = lazy(imports.Player);
export const Stats = lazy(imports.Stats);
