import {ACTIONS_SEARCH_TYPE, setSearchCardTitleAC} from '../../../bll/search-reducer'

it('ActionCreator setSearchCardTitle works correctly', () => {
  const setSearchACObj = setSearchCardTitleAC('testCardTitle')
  expect(setSearchACObj).toEqual({
    type: ACTIONS_SEARCH_TYPE.SET_SEARCH_CARD_TITLE,
    searchCardTitle: 'testCardTitle',
  })
})
