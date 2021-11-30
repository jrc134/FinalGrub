import { combineReducers } from 'redux';

import posts from './posts';
import donations from './donations';
import auth from './auth';

export const reducers = combineReducers({ posts, donations, auth });
