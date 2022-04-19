import React from 'react';
import { DescriptionSection } from 'qcraft-comp';

export default () => {
  const info = {
    jobId: 'testId',
    jobName: 'testName',
    jobStatus: 1,
    userName: 'Bob',
    createTime: 1607978826227,
    durationMs: 38243005069,
    stats: {
      name: '',
      total: 18,
      passed: 18,
      failed: 0,
      mileage: 0.24220000000000003,
    },
    algoVersion: 'v1.1.1',
    algoImageUrl: 'www.test.com',
    projectId: 6,
    projectName: 'testProject',
    jobPassed: true,
    runType: '不重复',
  };
  const items = [
    {
      title: '所属项目',
      dataIndex: 'projectName',
    },
    {
      title: '运行周期',
      dataIndex: 'runType',
    },
    {
      title: '镜像地址',
      dataIndex: 'algoImageUrl',
    },
    {
      title: '版本名称',
      dataIndex: 'algoVersion',
    },
  ];
  return (
    <>
      <DescriptionSection fields={items} title="任务详情" data={info} />
      <br />
      <DescriptionSection fields={items} title="任务详情" data={info} type="block" />
    </>
  );
};
