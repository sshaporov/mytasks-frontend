import {ACTIONS_TASKS_TYPE, addTaskAC} from '../../bll/tasks-reducer'

it('ActionCreator addTask works correctly', () => {
  const addTask = addTaskAC('Test task title', 'TestCardId')
  expect(addTask).toEqual({
    type: ACTIONS_TASKS_TYPE.ADD_TASK,
    taskTitle: 'Test task title',
    cardId: 'TestCardId'
  })
})
