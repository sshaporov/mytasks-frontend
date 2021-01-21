import {
  ACTIONS_TASKS_TYPE,
  changeTaskStatusAC,
  changeTaskTitleAC, removeTaskAC,
  setTasksAC
} from '../../../bll/tasks-reducer'
import {
  ACTIONS_CARDS_TYPE,
  addCardAC,
  CardFilterValuesType, changeCardFilterAC,
  changeCardTitleAC,
  removeCardAC,
  setCardsAC
} from '../../../bll/cards-reducer'
import {CardType} from '../../../dal/cards-api'

it('ActionCreator addCard works correctly', () => {
  const task: CardType = {_id: 'card_id', title: 'test card title'}
  const addCard = addCardAC(task)
  expect(addCard).toEqual({
    type: ACTIONS_CARDS_TYPE.ADD_CARD,
    card: {_id: 'card_id', title: 'test card title'}
  })
})

it('ActionCreator setCards works correctly', () => {
  const setCards = setCardsAC([
    {_id: 'card_id_1', title: 'test card title 1'},
    {_id: 'card_id_2', title: 'test card title 2'},
    ])
  expect(setCards).toEqual({
    type: ACTIONS_CARDS_TYPE.SET_CARDS,
    cards: [
      {_id: 'card_id_1', title: 'test card title 1'},
      {_id: 'card_id_2', title: 'test card title 2'},
      ]
  })
})

it('ActionCreator changeCardTitle works correctly', () => {
  const changeCardTitle = changeCardTitleAC('card_id', 'card_title')
  expect(changeCardTitle).toEqual({
    type: ACTIONS_CARDS_TYPE.CHANGE_CARD_TITLE,
    cardId: 'card_id',
    cardTitle: 'card_title',
  })
})

it('ActionCreator removeCard works correctly', () => {
  const removeCard = removeCardAC('card_id')
  expect(removeCard).toEqual({
    type: ACTIONS_CARDS_TYPE.REMOVE_CARD,
    cardId: 'card_id',
  })
})

it('ActionCreator changeCardFilter works correctly', () => {
  const changeCardFilter = changeCardFilterAC('ALL', 'card_id')
  expect(changeCardFilter).toEqual({
    type: ACTIONS_CARDS_TYPE.CHANGE_CARD_FILTER,
    cardId: 'card_id',
    filter: 'ALL',
  })
})
