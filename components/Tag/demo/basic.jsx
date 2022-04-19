import React from 'react';
import { Tag } from 'qcraft-comp';

export default () => {
  return <>
   <Tag color='blue' style={{marginRight: 20}} >运行中</Tag>
   <Tag color='green'  style={{marginRight: 20}} >成功</Tag>
   <Tag color='red' style={{marginRight: 20}}  >错误</Tag>
   <Tag color='orange'  style={{marginRight: 20}} >警告</Tag>
   <Tag color='gray'  style={{marginRight: 20}} >中止</Tag>
  </>
};