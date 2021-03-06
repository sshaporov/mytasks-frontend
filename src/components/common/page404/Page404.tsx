import {Button, Result} from 'antd';
import React from 'react';

export const Page404 = React.memo(() => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={<Button type="primary">Back Home</Button>}
    />
  )
})