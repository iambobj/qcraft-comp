import React, { useState } from 'react';
import { MultipleDatePicker } from 'qcraft-comp';

export default () => {
  const [value, setValue] = useState([]);
  return (
    <MultipleDatePicker
      value={value}
      selectProps={{
        maxTagCount: 3,
        style: { width: 350 },
      }}
      onChange={(value) => {
        setValue(value);
      }}
    />
  );
};
