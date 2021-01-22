import {
  addCardAC,
  CardFilterValuesType,
  cardsReducer,
  CardStateType,
  changeCardFilterAC,
  changeCardTitleAC,
  removeCardAC
} from '../../../bll/cards-reducer'
import {v1} from 'uuid'

let cardId1: string
let cardId2: string
let startCardState: Array<CardStateType> = []

beforeEach(() => {
  cardId1 = v1()
  cardId2 = v1()
  startCardState = [
    {_id: cardId1, title: "travel list", filter: "ALL"},
    {_id: cardId2, title: "my home tasks", filter: "ALL"},
  ]
})

it('Card tasks should be removed', () => {
  const endState = cardsReducer(startCardState, removeCardAC(cardId1))
  expect(endState.length).toBe(1)
  expect(endState[0]._id).toBe(cardId2)
})

it('Card tasks should be added', () => {
  const newCard: CardStateType = {_id: v1(), title: "new card title", filter: "ALL"}
  const endState = cardsReducer(startCardState, addCardAC(newCard))
  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(newCard.title)
  expect(endState[0].filter).toBe("ALL")
})

it('Card tasks should change title', () => {
  let newCardTitle = "new card title"
  const endState = cardsReducer(startCardState, changeCardTitleAC(cardId2, newCardTitle))
  expect(endState[0].title).toBe("travel list")
  expect(endState[1].title).toBe(newCardTitle)
})

it('Filter of card tasks should be changed', () => {
  let newFilter: CardFilterValuesType = "DONE"
  const endState = cardsReducer(startCardState, changeCardFilterAC(newFilter, cardId2))
  expect(endState[0].filter).toBe("ALL")
  expect(endState[1].filter).toBe(newFilter)
})
