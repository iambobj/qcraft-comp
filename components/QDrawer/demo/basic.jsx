import React, { useState } from 'react';
import { Button } from '@arco-design/web-react';
import { QDrawer } from 'qcraft-comp';

export default () => {
  const [viewDetail, setDetailVisiable] = useState(false);
  function handleViewDetail() {
    setDetailVisiable(!viewDetail);
  }
  const drawerConfig = {
    mask: true,
    width: 1000,
    title: '抽屉弹出层',
    visible: viewDetail,
    closable: true,
    footer: null,
    onCancel: handleViewDetail,
  };

  return (
    <>
      <Button
        onClick={() => {
          setDetailVisiable(!viewDetail);
        }}
      >
        展示抽屉
      </Button>
      <QDrawer {...drawerConfig} />
    </>
  );
};
