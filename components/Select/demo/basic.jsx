import React from 'react';
import { Select } from 'qcraft-comp';

export default () => {
  const options = [
    { label: 'test1', value: 0 },
    { label: 'test2', value: 1 },
  ];
  return <Select options={options} />;
};
