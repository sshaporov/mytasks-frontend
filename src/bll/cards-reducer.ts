enum ACTIONS_TYPE {
  ADD_CARD = 'Cards/ADD_CARD',
  REMOVE_CARD = 'Cards/REMOVE_CARD',
}

export type CardType = {
  id: string
  title: string
  filter: string
}
const initialState: Array<CardType> =  []

export const cardsReducer = (state: Array<CardType> = initialState, action: CardsACType): Array<CardType> => {
  switch (action.type) {
    case ACTIONS_TYPE.REMOVE_CARD:
      return state.filter(c => c.id !== action.cardId)
  }
}

// actions
export const addCard = (card: CardType) => ({type: ACTIONS_TYPE.ADD_CARD, card} as const)
export const removeCard = (cardId: string) => ({type: ACTIONS_TYPE.REMOVE_CARD, cardId} as const)

// types
export type RemoveCardACType = ReturnType<typeof removeCard>
export type AddCardACType = ReturnType<typeof removeCard>
export type CardsACType = RemoveCardACType | AddCardACType

