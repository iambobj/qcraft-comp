import React, { FC, ReactNode } from 'react';
import { Drawer, DrawerProps } from '@arco-design/web-react';
const QDrawer: FC<DrawerProps & { extra?: ReactNode }> = (props) => {
  const { children, onCancel, extra, title, ...rest } = props;
  const CustomConfig = {
    title: typeof title === 'string' ? <span className="cardTitle">{title}</span> : title,
    mask: true,
    width: 1000,
    closable: true,
    footer: null,
  };
  const newClose = () => {
    onCancel && (onCancel as any)();
  };
  return (
    <Drawer className="page-side-drawer" {...CustomConfig} {...rest} onCancel={newClose}>
      <div className="header-exrta">{extra}</div>
      {children}
    </Drawer>
  );
};
export default QDrawer;
