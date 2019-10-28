import {combineReducers} from 'redux';
import tags from './tags';
import auth from './auth';

const rootReducer = combineReducers({
    tags,
    auth,
});

export default rootReducer;
