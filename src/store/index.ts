import { combineReducers } from 'redux';
import userReducer from './user/userReducer';
import postReducer from './post/postReducer';

const rootReducer = combineReducers({
  user: userReducer,
  posts: postReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
