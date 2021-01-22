import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer, TasksType} from '../../../bll/tasks-reducer'
import {addCardAC, removeCardAC} from '../../../bll/cards-reducer'

let startTasksState: TasksType = {}
beforeEach(() => {
  startTasksState = {
    'cardId1': [
      { _id: '1', card_id: '1', title: 'JS', checked: false },
      { _id: '2', card_id: '1', title: 'REACT', checked: true },
      { _id: '3', card_id: '1', title: 'REST API', checked: false },
      { _id: '4', card_id: '1', title: 'CSS', checked: false },
      { _id: '5', card_id: '1', title: 'NODE', checked: false },
    ],
    'cardId2': [
      { _id: '1', card_id: '1', title: 'bread', checked: false },
      { _id: '2', card_id: '2', title: 'milk', checked: true },
      { _id: '3', card_id: '3', title: 'tea', checked: false },
      { _id: '4', card_id: '4', title: 'fish', checked: false },
      { _id: '5', card_id: '5', title: 'cream', checked: false },
    ]
  }
})

it('Task should be deleted from correct array', () => {
  const endTasksState = tasksReducer(startTasksState, removeTaskAC('5', 'cardId2'))
  expect(endTasksState['cardId1'].length).toBe(5)
  expect(endTasksState['cardId2'].length).toBe(4)
  expect(endTasksState['cardId2'].every(task => task._id != '5')).toBeTruthy()
})

it('Task should be added to correct array', () => {
  const endTasksState = tasksReducer(startTasksState, addTaskAC({_id: '6', card_id: 'cardId2', title: 'sugar', checked: false}, 'cardId2'))
  expect(endTasksState['cardId1'].length).toBe(5)
  expect(endTasksState['cardId2'].length).toBe(6)
  expect(endTasksState['cardId2'][5]._id).toBeDefined()
  expect(endTasksState['cardId2'][5].title).toBe('sugar')
  expect(endTasksState['cardId2'][5].checked).toBe(false)
})

it('Task status should be changed', () => {
  const endTasksState = tasksReducer(startTasksState, changeTaskStatusAC('1', true, 'cardId1'))
  expect(endTasksState['cardId1'][0].checked).toBe(true)
  expect(endTasksState['cardId2'][0].checked).toBe(false)
})

it('Task title should be changed', () => {
  const endTasksState = tasksReducer(startTasksState, changeTaskTitleAC("1", "rise", "cardId2"))
  expect(endTasksState['cardId1'][0].title).toBe("JS")
  expect(endTasksState['cardId2'][0].title).toBe("rise")
})

it('New array should be added when new card is added', () => {
  const endTasksState = tasksReducer(startTasksState, addCardAC({_id: '3', title: 'new card title'}))
  const keys = Object.keys(endTasksState)
  const newKey = keys.find(key => key != 'cardId1' && key != 'cardId2')
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
