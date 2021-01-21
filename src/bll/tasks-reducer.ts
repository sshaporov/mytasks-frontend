import {v1} from 'uuid'
import {
  ACTIONS_CARDS_TYPE, CardsThunkType, getCardsTC,
  // AddCardACType,
  // RemoveCardACType
} from './cards-reducer'
import {tasksAPI} from '../dal/tasks-api';

export enum ACTIONS_TASKS_TYPE {
  CHANGE_TASK_STATUS = 'Tasks/CHANGE_TASK_STATUS',
  ADD_TASK = 'Tasks/ADD_TASK',
  CHANGE_TASK_TITLE = 'Tasks/CHANGE_TASK_TITLE',
  REMOVE_TASK = 'Tasks/REMOVE_TASK',
  SET_TASKS = 'Tasks/SET_TASKS',
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

export const tasksReducer = (state: TasksType = initialState, action: TasksACType
  // | RemoveCardACType
  // | AddCardACType
) => {
  switch (action.type) {
    case ACTIONS_TASKS_TYPE.CHANGE_TASK_STATUS: {
      let todolistTasks = state[action.cardId]
      state[action.cardId] = todolistTasks
        .map(t => t.id === action.taskId
          ? {...t, isDone: !t.isDone}
          : t)
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
      const todolistTasks = state[action.cardId]
      state[action.cardId] = todolistTasks
        .map(t => t.id === action.taskId
          ? {...t, title: action.taskTitle}
          : t)
      return {...state}
    }
    case ACTIONS_TASKS_TYPE.REMOVE_TASK: {
      const stateCopy = {...state}
      const tasks = stateCopy[action.cardId]
      stateCopy[action.cardId] = tasks.filter(t => t.id !== action.taskId)
      return stateCopy
    }
    case ACTIONS_TASKS_TYPE.SET_TASKS: {
      return {...state, [action.cardId]: action.tasks}
    }
    // case ACTIONS_CARDS_TYPE.ADD_CARD:
    //   return {
    //     ...state,
    //     [action.cardId]: []
    //   }
    // case ACTIONS_CARDS_TYPE.REMOVE_CARD: {
    //   const copyState = {...state}
    //   delete copyState[action.cardId]
    //   return copyState
    // }
    default:
      return state
  }
}

// actions
export const changeTaskStatusAC = (taskId: string, cardId: string) => ({
  type: ACTIONS_TASKS_TYPE.CHANGE_TASK_STATUS,
  taskId,
  cardId,
} as const)
export const addTaskAC = (taskTitle: string, cardId: string) => ({
  type: ACTIONS_TASKS_TYPE.ADD_TASK,
  taskTitle,
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
export const setTasksAC = (tasks: Array<TaskType>, cardId: string) => ({
  type: ACTIONS_TASKS_TYPE.SET_TASKS,
  tasks,
  cardId,
} as const)

// types
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type SetTasksACType = ReturnType<typeof setTasksAC>
export type TasksACType = AddTaskACType | ChangeTaskTitleACType | ChangeTaskStatusACType | RemoveTaskACType | SetTasksACType

// thunks
export const addTaskTC = (taskTitle: string, cardId: string): CardsThunkType => {
  return (dispatch) => {
    tasksAPI.createTask(taskTitle, cardId)
      .then(res => {
        dispatch(getTasksTC(cardId))
      })
      .catch(e => {
        console.log('error - addTaskTC ', e)
      })
  }
}

export const getTasksTC = (cardId: string): CardsThunkType => {
  return (dispatch) => {
    tasksAPI.getTasks(cardId)
      .then(res => {
        //@ts-ignore
        dispatch(setTasksAC(res, cardId))
      })
      .catch(e => {
        console.log('error getTasksTC ', e)
      })
  }
}

// export const getTasksTC = (cardId: string): CardsThunkType => {
//   return (dispatch) => {
//     tasksAPI.getTasks(cardId)
//       .then(res => {
//         //@ts-ignore
//         dispatch(setTasksAC(res, cardId))
//       })
//       .catch(e => {
//         console.log('error getTasksTC ', e)
//       })
//   }
// }


