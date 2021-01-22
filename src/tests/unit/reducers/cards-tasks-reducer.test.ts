import {addCardAC, cardsReducer, CardStateType} from '../../../bll/cards-reducer'
import {tasksReducer, TasksType} from '../../../bll/tasks-reducer'
import {v1} from 'uuid';

it('Card should be created using Cards and Tasks reducers', () => {
  const startTasksState: TasksType = {}
  const startCardsState: Array<CardStateType> = []

  const action = addCardAC({_id: v1(), title: 'new card title'})
  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = cardsReducer(startCardsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromCards = endTodolistsState[0]._id

  expect(idFromTasks).toBe(action.card._id)
  expect(idFromCards).toBe(action.card._id)
});