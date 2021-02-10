# MyTasks app description


This is a [React application](https://lit-river-93303.herokuapp.com) (TypeScript template), a todo list, which is a dashboard on which cards with tasks are located. The user has access to a standard set of CRUD operations, as well as changing the status of the task "active <-> done" and filtering them.

<img width="1440" alt="Screenshot 2021-02-06 at 20 53 14" src="https://user-images.githubusercontent.com/35060830/107125950-db29f600-68bd-11eb-89c8-3b9d57f7dec0.png">

## UI (user interface)

UI level is based on [React](https://reactjs.org) library using functional components and hooks:
- useDispatch
- useState
- useSelector
- useCallback
- useMemo...

## BLL (business logic layer)

[Redux](https://redux.js.org/) library was chosen as the state management of aplication and for the implementation of the business level
- reducers
- actions
- action creators
- thunks
- thunk creators 

## DAL (data access layer)

[Axios](https://www.npmjs.com/package/axios) library was chosen to implement data access. The standard set of CRUD operations is implemented for data, the following library methods were used to communicate with the server: get, post, put, delete

## TESTS

[Jest](https://jestjs.io/) - JavaScript Testing Framework. Test coverage currently consists of unit tests: action creators, reducers

## Plans
- Code refactoring
- Implement Drag and Drop
- Add email notification
- Settings
- Add calendar 
- Add cards types and colors
- Increase test coverage




