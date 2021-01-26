import {DEV_VERSION} from '../config'
import thunkMiddleware from 'redux-thunk'
import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import { cardsReducer } from './cards-reducer'
import { tasksReducer } from './tasks-reducer'
import {registrationReducer} from './registration-reducer'
import {authReducer} from './auth-reducer'
import {userReducer} from './user-reducer'

const reducers = combineReducers({
  cards: cardsReducer,
  tasks: tasksReducer,
  registration: registrationReducer,
  auth: authReducer,
  user: userReducer,
})
export type AppStateType = ReturnType<typeof reducers>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.store = store
if (DEV_VERSION) {
  // @ts-ignore
  window.store = store
}