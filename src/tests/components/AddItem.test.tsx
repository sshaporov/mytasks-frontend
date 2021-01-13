import React from 'react'
import renderer from 'react-test-renderer'
import {AddItem} from '../../components/common/addItem/AddItem'

it('Card AddItem component renders correctly', () => {
  const tree = renderer
    .create(<AddItem type={'card'} addItem={() => {}}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})

it('Task AddItem component renders correctly', () => {
  const tree = renderer
    .create(<AddItem type={'task'} addItem={() => {}}/>)
    .toJSON()
  expect(tree).toMatchSnapshot()
})