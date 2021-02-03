import {ACTIONS_SEARCH_TYPE, setSearchCardTitleAC} from '../../../bll/search-reducer'

it('ActionCreator setSearchCardTitle works correctly', () => {
  const setIsAuthACObj = setSearchCardTitleAC('testCardTitle')
  expect(setIsAuthACObj).toEqual({
    type: ACTIONS_SEARCH_TYPE.SET_SEARCH_CARD_TITLE,
    searchCardTitle: 'testCardTitle',
  })
})
