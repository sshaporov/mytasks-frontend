import React from 'react'
import {PlusCircleOutlined} from '@ant-design/icons';
import {Button} from 'antd';
import {EditableTask} from '../task/editableSpan/EditableTask';

export const AddCard = React.memo(() => {
  return (
    <div>
      <Button
        type="text"
        icon={<PlusCircleOutlined/>}
        block
        // onClick={onClickAddBtn}
      >Add task</Button>

      <EditableTask value={'title'}
                    changeValue={() => {}}
                    editMode={false}
                    setEditMode={() => {}}
      />
    </div>
  )
})