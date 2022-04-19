import React from 'react';
import { StatusIcon } from 'qcraft-comp';

export default () => {
  return <div style={{width: 100}}>
    <StatusIcon type='processing' content='运行中'/>
    <StatusIcon type='success' content='已通过'/>
    <StatusIcon type='error' content='未通过'/>
    <StatusIcon type='default' content='已中止'/>
    <StatusIcon type='warning' content='已撤销'/>
    <StatusIcon type='processing' content='30/50'/>
  </div>;
};
