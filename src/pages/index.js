import { lazy } from 'react';

export const imports = {
  Home: () => import(/* webpackChunkName: "home" */ 'pages/Home'),
  Motd: () => import(/* webpackChunkName: "motd" */ 'pages/Motd'),
  NotFound: () => import(/* webpackChunkName: "not-found" */ 'pages/NotFound'),
  Player: () => import(/* webpackChunkName: "player" */ 'pages/Player'),
  Rules: () => import(/* webpackChunkName: "rules" */ 'pages/Rules'),
  Stats: () => import(/* webpackChunkName: "stats" */ 'pages/Stats')
};

export const Home = lazy(imports.Home);
export const Motd = lazy(imports.Motd);
export const NotFound = lazy(imports.NotFound);
export const Player = lazy(imports.Player);
export const Rules = lazy(imports.Rules);
export const Stats = lazy(imports.Stats);
