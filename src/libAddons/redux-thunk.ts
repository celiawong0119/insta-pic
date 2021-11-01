import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '../store/index';

// type for redux-thunk actions
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
