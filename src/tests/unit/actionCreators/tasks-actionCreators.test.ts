import {
  ACTIONS_TASKS_TYPE,
  addTaskAC,
  changeTaskStatusAC,
  changeTaskTitleAC, removeTaskAC,
  setTasksAC
} from '../../../bll/tasks-reducer'
import {TaskType} from '../../../dal/tasks-api'

it('ActionCreator addTask works correctly', () => {
  const task: TaskType = {_id: 'task_id', card_id: 'card_id', title: 'test task title', checked: false}
  const addTask = addTaskAC(task)
  expect(addTask).toEqual({
    type: ACTIONS_TASKS_TYPE.ADD_TASK,
    task: {_id: 'task_id', card_id: 'card_id', title: 'test task title', checked: false}
  })
})

it('ActionCreator setTasks works correctly', () => {
  const setTasks = setTasksAC([
    {_id: 'task_id_1', card_id: 'card_id_1', title: 'test title 1', checked: false},
    {_id: 'task_id_2', card_id: 'card_id_2', title: 'test title 2', checked: true},
    ], 'card_id_1')
  expect(setTasks).toEqual({
    type: ACTIONS_TASKS_TYPE.SET_TASKS,
    tasks: [
      {_id: 'task_id_1', card_id: 'card_id_1', title: 'test title 1', checked: false},
      {_id: 'task_id_2', card_id: 'card_id_2', title: 'test title 2', checked: true}
      ],
    cardId: 'card_id_1'
  })
})

it('ActionCreator changeTaskTitle works correctly', () => {
  const changeTaskTitle = changeTaskTitleAC('task_id', 'test task title', 'card_id')
  expect(changeTaskTitle).toEqual({
    type: ACTIONS_TASKS_TYPE.CHANGE_TASK_TITLE,
    taskId: 'task_id',
    taskTitle: 'test task title',
    cardId: 'card_id',
  })
})

it('ActionCreator changeTaskStatus works correctly', () => {
  const changeTaskStatus = changeTaskStatusAC('task_id', true, 'card_id')
  expect(changeTaskStatus).toEqual({
    type: ACTIONS_TASKS_TYPE.CHANGE_TASK_STATUS,
    taskId: 'task_id',
    taskIsChecked: true,
    cardId: 'card_id',
  })
})

it('ActionCreator removeTask works correctly', () => {
  const removeTask = removeTaskAC('task_id', 'card_id')
  expect(removeTask).toEqual({
    type: ACTIONS_TASKS_TYPE.REMOVE_TASK,
    taskId: 'task_id',
    cardId: 'card_id',
  })
})