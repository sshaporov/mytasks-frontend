import React from 'react'
import renderer from 'react-test-renderer'
import {AddItem} from '../../components/common/addItem/AddItem'

it('CARD AddItem component renders correctly', () => {
  const tree = renderer
    .create(<AddItem type={'card'} addItem={() => {}}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})


