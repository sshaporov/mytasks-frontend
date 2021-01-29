import {ACTIONS_CARDS_TYPE} from './cards-reducer'
import {tasksAPI, TaskType} from '../dal/tasks-api'
import {AppReducersType, AppThunksType} from './store'
import {ACTIONS_AUTH_TYPE} from './auth-reducer'
import {setErrorAC, setStatusAC} from './request-reducer';

export enum ACTIONS_TASKS_TYPE {
  CHANGE_TASK_STATUS = 'Tasks/CHANGE_TASK_STATUS',
  ADD_TASK = 'Tasks/ADD_TASK',
  CHANGE_TASK_TITLE = 'Tasks/CHANGE_TASK_TITLE',
  REMOVE_TASK = 'Tasks/REMOVE_TASK',
  SET_TASKS = 'Tasks/SET_TASKS',
}

export type TasksType = {
  [key: string]: Array<TaskType>
}
const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: AppReducersType) => {
  switch (action.type) {

    case ACTIONS_CARDS_TYPE.SET_CARDS: {
      const copyState = {...state}
      action.cards.forEach(card => {
        copyState[card._id] = []
      })
      return copyState
    }

    case ACTIONS_CARDS_TYPE.ADD_CARD: {
      return {...state, [action.card._id]: []}
    }

    case ACTIONS_CARDS_TYPE.REMOVE_CARD: {
      const copyState = {...state}
      delete copyState[action.cardId]
      return copyState
    }

    case ACTIONS_TASKS_TYPE.SET_TASKS: {
      return {...state, [action.cardId]: action.tasks}
    }

    case ACTIONS_TASKS_TYPE.ADD_TASK: {
      return {...state, [action.cardId]: [...state[action.task.card_id], action.task]}
    }

    case ACTIONS_TASKS_TYPE.CHANGE_TASK_STATUS: {
      return {
        ...state,
        [action.cardId]: state[action.cardId]
          .map(task => task._id === action.taskId ? {...task, checked: action.taskIsChecked} : task )
      }
    }

    case ACTIONS_TASKS_TYPE.CHANGE_TASK_TITLE: {
      return {
        ...state,
        [action.cardId]: state[action.cardId]
          .map(task => task._id === action.taskId ? {...task, title: action.taskTitle} : task )
      }
    }

    case ACTIONS_TASKS_TYPE.REMOVE_TASK: {
      return {...state, [action.cardId]: state[action.cardId].filter(task => task._id !== action.taskId)}
    }

    case ACTIONS_AUTH_TYPE.LOGOUT:
      return {}

    default:
      return state
  }
}

// actions
export const setTasksAC = (tasks: Array<TaskType>, cardId: string) => ({
  type: ACTIONS_TASKS_TYPE.SET_TASKS,
  tasks,
  cardId,
} as const)
export const addTaskAC = (task: TaskType, cardId: string) => ({
  type: ACTIONS_TASKS_TYPE.ADD_TASK,
  task,
  cardId,
} as const)
export const changeTaskStatusAC = (taskId: string, taskIsChecked: boolean, cardId: string) => ({
  type: ACTIONS_TASKS_TYPE.CHANGE_TASK_STATUS,
  taskId,
  taskIsChecked,
  cardId,
} as const)
export const changeTaskTitleAC = (taskId: string, taskTitle: string, cardId: string) => ({
  type: ACTIONS_TASKS_TYPE.CHANGE_TASK_TITLE,
  taskId,
  taskTitle,
  cardId,
} as const)
export const removeTaskAC = (taskId: string, cardId: string) => ({
  type: ACTIONS_TASKS_TYPE.REMOVE_TASK,
  taskId,
  cardId
} as const)


// types
export type SetTasksACType = ReturnType<typeof setTasksAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type TasksACType = AddTaskACType | ChangeTaskTitleACType | ChangeTaskStatusACType | RemoveTaskACType | SetTasksACType

// thunks
export const getTasksTC = (cardId: string): AppThunksType => {
  return (dispatch) => {
    dispatch(setStatusAC('loading'))
    tasksAPI.getTasks(cardId)
      .then(res => {
        dispatch(setTasksAC(res, cardId))
        dispatch(setStatusAC('succeeded'))
      })
      .catch(err => {
        dispatch(setErrorAC(err.message ? err.message : 'Something went wrong'))
        dispatch(setStatusAC('failed'))
      })
  }
}

export const addTaskTC = (taskTitle: string, cardId: string): AppThunksType => {
  return (dispatch) => {
    dispatch(setStatusAC('loading'))
    tasksAPI.createTask(taskTitle, cardId)
      .then(res => {
        dispatch(addTaskAC(res.item, cardId))
        dispatch(setStatusAC('succeeded'))
      })
      .catch(err => {
        dispatch(setErrorAC(err.message ? err.message : 'Something went wrong'))
        dispatch(setStatusAC('failed'))
      })
  }
}


export const changeTaskStatusTC = (taskId: string, taskIsChecked: boolean, cardId: string): AppThunksType => {
  return (dispatch) => {
    dispatch(setStatusAC('loading'))
    tasksAPI.changeTaskStatus(taskId, taskIsChecked, cardId)
      .then(res => {
        dispatch(changeTaskStatusAC(taskId, taskIsChecked, cardId))
        dispatch(setStatusAC('succeeded'))
      })
      .catch(err => {
        dispatch(setErrorAC(err.message ? err.message : 'Something went wrong'))
        dispatch(setStatusAC('failed'))
      })
  }
}

export const changeTaskTitleTC = (taskId: string, taskTitle: string, cardId: string): AppThunksType => {
  return (dispatch) => {
    dispatch(setStatusAC('loading'))
    tasksAPI.changeTaskTitle(taskId, taskTitle, cardId)
      .then(res => {
        dispatch(changeTaskTitleAC(taskId, taskTitle, cardId))
        dispatch(setStatusAC('succeeded'))
      })
      .catch(err => {
        dispatch(setErrorAC(err.message ? err.message : 'Something went wrong'))
        dispatch(setStatusAC('failed'))
      })
  }
}

export const removeTaskTC = (taskId: string, cardId: string): AppThunksType => {
  return (dispatch) => {
    dispatch(setStatusAC('loading'))
    tasksAPI.removeTask(taskId, cardId)
      .then(res => {
        dispatch(removeTaskAC(taskId, cardId))
        dispatch(setStatusAC('succeeded'))
      })
      .catch(e => {
        console.log('error removeTaskTC ', e)
      })
  }
}


