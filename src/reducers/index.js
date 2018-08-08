import { combineReducers } from 'redux';

import numbers from './numbers';
import message from './message';
import level from './level';
import cash from './cash';

export default combineReducers( {
    numbers,
    message,
    level,
    cash
} );