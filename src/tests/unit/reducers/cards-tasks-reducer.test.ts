import {addCardAC, cardsReducer, CardType} from '../../../bll/cards-reducer'
import {tasksReducer, TasksType} from '../../../bll/tasks-reducer'

it('Card should be created using Cards and Tasks reducers', () => {
  const startTasksState: TasksType = {}
  const startCardsState: Array<CardType> = []

  const action = addCardAC("new card")
  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = cardsReducer(startCardsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromCards = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.cardId)
  expect(idFromCards).toBe(action.cardId)
});