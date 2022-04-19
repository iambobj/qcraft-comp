import React from 'react';
import { List as ComList } from 'qcraft-comp';

export default () => {
  const handleChange = (value, type) => {
    console.log(value, type);
  };
  const list = [
    { name: '测试1', value: '测试1' },
    { name: '测试2', value: '测试2' },
    { name: '测试3', value: '测试3' },
    { name: '测试4', value: '测试4' },
    { name: '测试5', value: '测试5' },
    { name: '测试6', value: '测试6' },
  ];
  return (
    <div style={{ width: 300 }}>
      <ComList
        setAll={true}
        showNoGroup={true}
        className="mt-2"
        style={
          {
            /*height: 700 */
          }
        }
        onChange={handleChange}
        data={list}
        labelKey="name"
        valueKey="value"
      />
    </div>
  );
};
