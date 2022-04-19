import React from 'react';
import { CompositerFilter } from 'qcraft-comp';

export default () => {
  function handleSearch(filterValues) {
    console.log(filterValues)
  }
  const options = [
    {label: '测试0', value: 0},
    {label: '测试1', value: 1},
    {label: '测试2', value: 2},
  ]
  return <CompositerFilter
    defaultFilterName="name"
    filters={[
      {
        type: 'input',
        name: 'name',
        label: '名称'
      },
      {
        type: 'input',
        name: 'desc',
        label: '描述'
      },
      {
        type: 'multiple',
        name: 'select',
        label: '测试下拉',
        children: options
      },
    ]}
    onChange={handleSearch}
    style={{
      width: 400,
      marginBottom: 18,
    }}
  />
};
