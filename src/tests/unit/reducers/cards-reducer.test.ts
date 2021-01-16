import {
  addCardAC,
  CardFilterType,
  cardsReducer,
  CardType,
  changeCardFilterAC,
  changeCardTitleAC,
  removeCardAC
} from '../../../bll/cards-reducer'
import {v1} from 'uuid'

let cardId1: string
let cardId2: string
let startCardState: Array<CardType> = []

beforeEach(() => {
  cardId1 = v1()
  cardId2 = v1()
  startCardState = [
    {id: cardId1, title: "Travel list", filter: "ALL"},
    {id: cardId2, title: "My home tasks", filter: "ALL"},
  ]
})

it('Card tasks should be removed', () => {
  const endState = cardsReducer(startCardState, removeCardAC(cardId1))
  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(cardId2)
})

it('Card tasks should be added', () => {
  let newCardTitle = "New card tasks"
  const endState = cardsReducer(startCardState, addCardAC(newCardTitle))
  expect(endState.length).toBe(3)
  expect(endState[2].title).toBe(newCardTitle)
  expect(endState[0].filter).toBe("ALL")
})

it('Card tasks should change title', () => {
  let newCardTitle = "New card tasks"
  const endState = cardsReducer(startCardState, changeCardTitleAC(cardId2, newCardTitle))
  expect(endState[0].title).toBe("Travel list")
  expect(endState[1].title).toBe(newCardTitle)
})

it('Filter of card tasks should be changed', () => {
  let newFilter: CardFilterType = "DONE"
  const endState = cardsReducer(startCardState, changeCardFilterAC(newFilter, cardId2))
  expect(endState[0].filter).toBe("ALL")
  expect(endState[1].filter).toBe(newFilter)
})
