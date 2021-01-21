import {ACTIONS_TASKS_TYPE, addTaskAC, setTasksAC} from '../../../bll/tasks-reducer'
import {TaskType} from '../../../dal/tasks-api'

it('ActionCreator addTask works correctly', () => {
  const task: TaskType = {_id: 'task_id_1', card_id: 'card_id_1', title: 'test title', checked: false}
  const addTask = addTaskAC(task)
  expect(addTask).toEqual({
    type: ACTIONS_TASKS_TYPE.ADD_TASK,
    task: {_id: 'task_id_1', card_id: 'card_id_1', title: 'test title', checked: false}
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
