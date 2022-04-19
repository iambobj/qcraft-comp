import React from 'react';
import { Tag as ArcoTag, TagProps } from '@arco-design/web-react';
import './style/index';

export function Tag(props: TagProps) {
  const { children, icon, className = '', ...tagProps } = props;

  const styleClass = 'tagText tagWrap ' + className;

  return (
    <>
      <ArcoTag {...tagProps} className={styleClass}>
        {children}
      </ArcoTag>
    </>
  );
}

export default Tag;
