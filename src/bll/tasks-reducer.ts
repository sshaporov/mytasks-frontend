import {v1} from 'uuid'
import {ACTIONS_CARDS_TYPE, AddCardACType, RemoveCardACType} from './cards-reducer'

export enum ACTIONS_TASKS_TYPE {
  CHANGE_TASK_STATUS = 'Tasks/CHANGE_TASK_STATUS',
  ADD_TASK = 'Tasks/ADD_TASK',
  CHANGE_TASK_TITLE = 'Tasks/CHANGE_TASK_TITLE',
  REMOVE_TASK = 'Tasks/REMOVE_TASK',
}

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean,
}
export type TasksType = {
  [key: string]: Array<TaskType>
}
const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: TasksACType | RemoveCardACType | AddCardACType) => {
  switch (action.type) {
    case ACTIONS_TASKS_TYPE.CHANGE_TASK_STATUS: {
      const tasksByCardId = state[action.cardId]
      const task = tasksByCardId.find(task => task.id === action.taskId)
      if (task) {
        task.isDone = !task.isDone
      }
      return {...state}
    }
    case ACTIONS_TASKS_TYPE.ADD_TASK: {
      const stateCopy = {...state}
      const newTask: TaskType = {
        id: v1(),
        title: action.taskTitle,
        isDone: false
      }
      const tasks = stateCopy[action.cardId]
      const newTasks = [...tasks, newTask]
      stateCopy[action.cardId] = newTasks
      return stateCopy
    }
    case ACTIONS_TASKS_TYPE.CHANGE_TASK_TITLE: {
      const tasksByCardId = state[action.cardId]
      const task = tasksByCardId.find(task => task.id === action.taskId)
      if (task) {
        task.title = action.taskTitle
      }
      return ({...state})
    }
    case ACTIONS_TASKS_TYPE.REMOVE_TASK: {
      const tasksByCardId = state[action.cardId]
      state[action.cardId] = tasksByCardId.filter(task => task.id !== action.taskId)
      return {...state}
    }
    case ACTIONS_CARDS_TYPE.ADD_CARD:
      return {
        ...state,
        [action.cardId]: []
      }
    case ACTIONS_CARDS_TYPE.REMOVE_CARD: {
      const copyState = {...state};
      delete copyState[action.cardId];
      return copyState;
    }
    default:
      return state
  }
}

// actions
export const changeTaskStatusAC = (taskId: string, cardId: string) => ({
  type: ACTIONS_TASKS_TYPE.CHANGE_TASK_STATUS,
  taskId,
  cardId
} as const)
export const addTaskAC = (taskTitle: string, cardId: string) => ({
  type: ACTIONS_TASKS_TYPE.ADD_TASK,
  taskTitle,
  cardId
} as const)
export const changeTaskTitleAC = (taskId: string, taskTitle: string, cardId: string) => ({
  type: ACTIONS_TASKS_TYPE.CHANGE_TASK_TITLE,
  taskId,
  taskTitle,
  cardId
} as const)
export const removeTaskAC = (taskId: string, cardId: string) => ({
  type: ACTIONS_TASKS_TYPE.REMOVE_TASK,
  taskId,
  cardId
} as const)


// types
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type TasksACType = AddTaskACType | ChangeTaskTitleACType | ChangeTaskStatusACType | RemoveTaskACType


