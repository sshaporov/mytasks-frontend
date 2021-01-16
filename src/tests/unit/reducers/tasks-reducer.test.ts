import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer, TasksType} from '../../../bll/tasks-reducer'
import {addCardAC, removeCardAC} from '../../../bll/cards-reducer'

let startTasksState: TasksType = {}
beforeEach(() => {
  startTasksState = {
    'cardId1': [
      { id: '1', title: 'JS', isDone: false },
      { id: '2', title: 'REACT', isDone: true },
      { id: '3', title: 'REST API', isDone: false },
      { id: '4', title: 'CSS', isDone: false },
      { id: '5', title: 'NODE', isDone: false },
    ],
    'cardId2': [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
      { id: '4', title: 'fish', isDone: false },
      { id: '5', title: 'cream', isDone: false },
    ]
  }
})

it('Task should be deleted from correct array', () => {
  const endTasksState = tasksReducer(startTasksState, removeTaskAC('5', 'cardId2'))
  expect(endTasksState['cardId1'].length).toBe(5)
  expect(endTasksState['cardId2'].length).toBe(4)
  expect(endTasksState['cardId2'].every(t => t.id != '5')).toBeTruthy()
})

it('Task should be added to correct array', () => {
  const endTasksState = tasksReducer(startTasksState, addTaskAC('sugar', 'cardId2'))
  expect(endTasksState['cardId1'].length).toBe(5)
  expect(endTasksState['cardId2'].length).toBe(6)
  expect(endTasksState['cardId2'][5].id).toBeDefined()
  expect(endTasksState['cardId2'][5].title).toBe('sugar')
  expect(endTasksState['cardId2'][5].isDone).toBe(false)
})

it('Task status should be changed', () => {
  const endTasksState = tasksReducer(startTasksState, changeTaskStatusAC('1', 'cardId1'))
  expect(endTasksState['cardId1'][0].isDone).toBe(true)
  expect(endTasksState['cardId2'][0].isDone).toBe(false)
})

it('Task title should be changed', () => {
  const endTasksState = tasksReducer(startTasksState, changeTaskTitleAC("1", "rise", "cardId2"))
  expect(endTasksState['cardId1'][0].title).toBe("JS")
  expect(endTasksState['cardId2'][0].title).toBe("rise")
})

it('New array should be added when new card is added', () => {
  const endTasksState = tasksReducer(startTasksState, addCardAC('new card'))
  const keys = Object.keys(endTasksState)
  const newKey = keys.find(k => k != 'cardId1' && k != 'cardId2')
  if (!newKey) throw Error('new key should be added')
  expect(keys.length).toBe(3)
  expect(endTasksState[newKey]).toEqual([])
})

it('Card should be deleted', () => {
  const endTasksState = tasksReducer(startTasksState, removeCardAC('cardId2'))
  const keys = Object.keys(endTasksState)
  expect(keys.length).toBe(1)
  expect(endTasksState['cardId2']).not.toBeDefined()
})
