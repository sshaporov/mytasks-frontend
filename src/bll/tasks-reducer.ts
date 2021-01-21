import {ACTIONS_CARDS_TYPE, AddCardACType, CardsThunkType, RemoveCardACType, SetCardsACType} from './cards-reducer'
import {tasksAPI, TaskType} from '../dal/tasks-api'
import {ThunkAction} from 'redux-thunk';
import {AppStateType} from './store';
import {Dispatch} from 'react';

export enum ACTIONS_TASKS_TYPE {
  CHANGE_TASK_STATUS = 'Tasks/CHANGE_TASK_STATUS',
  ADD_TASK = 'Tasks/ADD_TASK',
  CHANGE_TASK_TITLE = 'Tasks/CHANGE_TASK_TITLE',
  REMOVE_TASK = 'Tasks/REMOVE_TASK',
  SET_TASKS = 'Tasks/SET_TASKS',
}

// export type TaskType = {
//   _id: string,
//   card_id: string,
//   checked: boolean,
//   title: string
// }

export type TasksType = {
  [key: string]: Array<TaskType>
}
const initialState: TasksType = {}

export const tasksReducer = (state: TasksType = initialState, action: TasksACType
  | AddCardACType | SetCardsACType | RemoveCardACType
) => {
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
      return {...state, [action.task.card_id]: [...state[action.task.card_id], action.task]}
    }

    case ACTIONS_TASKS_TYPE.CHANGE_TASK_STATUS: {
      return {
        ...state,
        [action.cardId]: state[action.cardId]
          .map(t => t._id === action.taskId ? {...t, checked: action.taskStatus} : t )
      }
    }


    case ACTIONS_TASKS_TYPE.CHANGE_TASK_TITLE: {
      const todolistTasks = state[action.cardId]
      state[action.cardId] = todolistTasks
        .map(t => t._id === action.taskId
          ? {...t, title: action.taskTitle}
          : t)
      return {...state}
    }
    case ACTIONS_TASKS_TYPE.REMOVE_TASK: {
      const stateCopy = {...state}
      const tasks = stateCopy[action.cardId]
      stateCopy[action.cardId] = tasks.filter(t => t._id !== action.taskId)
      return stateCopy
    }


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
export const addTaskAC = (task: TaskType) => ({
  type: ACTIONS_TASKS_TYPE.ADD_TASK,
  task
} as const)


export const changeTaskStatusAC = (taskId: string, taskStatus: boolean, cardId: string) => ({
  type: ACTIONS_TASKS_TYPE.CHANGE_TASK_STATUS,
  taskId,
  taskStatus,
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
  cardId,
} as const)


// types
export type SetTasksACType = ReturnType<typeof setTasksAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>

export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>

export type TasksACType = AddTaskACType
  | ChangeTaskTitleACType
  | ChangeTaskStatusACType
  | RemoveTaskACType
  | SetTasksACType

export type TasksThunkType = ThunkAction<void, AppStateType, Dispatch<TasksACType> , TasksACType>


// thunks
export const getTasksTC = (cardId: string): TasksThunkType => {
  return (dispatch) => {
    tasksAPI.getTasks(cardId)
      .then(res => {
        dispatch(setTasksAC(res, cardId))
      })
      .catch(e => {
        console.log('error getTasksTC ', e)
      })
  }
}

export const addTaskTC = (taskTitle: string, cardId: string): TasksThunkType => {
  return (dispatch) => {
    tasksAPI.createTask(taskTitle, cardId)
      .then(res => {
        dispatch(addTaskAC(res.item))
      })
      .catch(e => {
        console.log('error - addTaskTC ', e)
      })
  }
}


export const changeTaskStatusTC = (taskId: string, taskStatus: boolean, cardId: string): CardsThunkType => {
  return (dispatch) => {
    tasksAPI.changeTaskStatus(taskId, taskStatus, cardId)
      .then(res => {
        //@ts-ignore
        dispatch(changeTaskStatusAC(taskId, taskStatus, cardId))
      })
      .catch(e => {
        console.log('error getTasksTC ', e)
      })
  }
}


