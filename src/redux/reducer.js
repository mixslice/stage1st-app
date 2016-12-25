import { combineReducers } from 'redux-immutable';
import { NavigationReducer } from '@exponent/ex-navigation';
import SessionStateReducer from '../modules/session/SessionState';
import ErrorStateReducer from '../modules/error/ErrorState';
import EntitiesStateReducer from '../modules/entities/EntitiesState';
import PaginationStateReducer from '../modules/pagination/PaginationState';
import AuthStateReducer from '../modules/auth/AuthState';

// after reducer changes, don't forget to update the persist policy in store.js
export default combineReducers({
  // @NOTE: By convention, the navigation state must live in a subtree called
  // `navigation`
  navigation: NavigationReducer,
  session: SessionStateReducer,
  error: ErrorStateReducer,

  // persist
  entities: EntitiesStateReducer,
  pagination: PaginationStateReducer,
  auth: AuthStateReducer,

  // others
});
