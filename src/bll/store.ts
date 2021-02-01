import {DEV_VERSION} from '../config'
import thunkMiddleware, {ThunkAction} from 'redux-thunk'
import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import {CardsACType, cardsReducer} from './cards-reducer'
import {TasksACType, tasksReducer} from './tasks-reducer'
import {RegistrationACType, registrationReducer} from './registration-reducer'
import {AuthACType, authReducer} from './auth-reducer'
import {UserACType, userReducer} from './user-reducer'
import {RequestACType, requestReducer} from './request-reducer'
import {Dispatch} from 'react'
import {SearchACType, searchReducer} from './search-reducer'

const reducers = combineReducers({
  cards: cardsReducer,
  tasks: tasksReducer,
  registration: registrationReducer,
  auth: authReducer,
  user: userReducer,
  request: requestReducer,
  search: searchReducer,
})
export type AppStateType = ReturnType<typeof reducers>
export type AppReducersType = UserACType | TasksACType | RequestACType | RegistrationACType | CardsACType | AuthACType | SearchACType
export type AppThunksType = ThunkAction<void, AppStateType, Dispatch<AppReducersType> , AppReducersType>

//@ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

// @ts-ignore
window.store = store
if (DEV_VERSION) {
  // @ts-ignore
  window.store = store
}