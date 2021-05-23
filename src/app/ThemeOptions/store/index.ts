import { combineReducers } from 'redux';
import { ConfigReducer } from './config.reducer';

export class Sentinel {
  config;
};

export const rootReducer = combineReducers<Sentinel>({
  config: ConfigReducer,
});


