import { Progress } from '@arco-design/web-react';
import React, { CSSProperties, ReactNode } from 'react';
import {
  IconCheckCircleFill,
  IconMinusCircleFill,
  IconCloseCircleFill,
  IconLoading,
  IconExclamationCircleFill,
} from '@arco-design/web-react/icon';
import './style/index';

interface SettingProps {
  style?: CSSProperties;
  content: string | ReactNode;
  type: string;
}

interface IconConfig {
  [key: string]: ReactNode;
}

export function StatusIcon(props: SettingProps) {
  const { type, content, style: propsStyle } = props;
  const commonIcon: IconConfig = {
    processing: (
      <span className="status-icon-wrap" style={{ color: '#286af4', ...propsStyle }}>
        <IconLoading />
        &nbsp;{content}
      </span>
    ),
    success: (
      <span className="status-icon-wrap" style={{ color: '#00AA2A', ...propsStyle }}>
        <IconCheckCircleFill />
        &nbsp;{content}
      </span>
    ),
    error: (
      <span className="status-icon-wrap" style={{ color: '#e63f3f', ...propsStyle }}>
        <IconCloseCircleFill />
        &nbsp;{content}
      </span>
    ),
    default: (
      <span className="status-icon-wrap" style={{ color: '#86909c', ...propsStyle }}>
        <IconMinusCircleFill />
        &nbsp;{content}
      </span>
    ),
    warning: (
      <span className="status-icon-wrap" style={{ color: '#FA9600', ...propsStyle }}>
        <IconExclamationCircleFill />
        &nbsp;{content}
      </span>
    ),
  };
  // 需要做占比表示
  if (type === 'processing' && typeof content === 'string') {
    const numArray = content.split('/');
    const firstNum = +numArray[0];
    const secNum = +numArray[1];
    const per = (firstNum / secNum) * 100;
    const format = () => {
      return (
        <>
          <span style={{ color: '#286af4' }}>{firstNum}</span> /{' '}
          <span style={{ color: '#363e4d' }}>{secNum}</span>
        </>
      );
    };
    const viewProgress = content.indexOf('/') >= 0;
    return (
      <>
        <span
          className="status-icon-wrap progress-line-wrap"
          style={{ color: '#286af4', ...propsStyle }}
        >
          <span>
            <IconLoading />
            &nbsp;运行中
            {viewProgress && <Progress percent={per} size="small" formatText={format} />}
          </span>
        </span>
      </>
    );
  }
  return <>{commonIcon[type]}</>;
}

export default StatusIcon;
