# MyTasks app description


This is a [React application](https://lit-river-93303.herokuapp.com), a todo list, which is a dashboard on which cards with tasks are located. The user has access to a standard set of CRUD operations, as well as changing the status of the task "active <-> done" and filtering them.

## UI (user interface)

UI level level is based on React library using functional components and hooks:
- useDispatch
- useState
- useSelector
- useCallback
- useMemo...

## BLL (business logic layer)

Redax library was chosen as the state management of aplication and for the implementation of the business level
- reducers
- actions
- action creators
- thunks
- thunk creators

## DAL (data access layer)

Axios library was chosen to implement data access. The standard set of CRUD operations is implemented for data, the following library methods were used to communicate with the server: get, post, put, delete

## next item

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.



## Plans


