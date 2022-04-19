import { IconClose } from '@arco-design/web-react/icon';
import { Tooltip } from '@arco-design/web-react';
import React, { FC, useState, useEffect, useRef } from 'react';
import './tag.less';
import InputFilterType from './inputType';
import { tagType } from '.';
import MultiFilterType from './multiType';
interface ITag {
  label: string;
  value: string | string[];
  name: string;
  type: tagType;
  children: any;
  onModify: (name: string, v: string | string[]) => void;
  onRemove: (name: string) => void;
}
const FilterTag: FC<ITag> = ({ type, label, value, name, onModify, onRemove, children }) => {
  const tagWrapRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    tagWrapRef.current?.addEventListener('click', () => {
      setActive(true);
    });
  }, []);
  useEffect(() => {
    const hidePop = (e: Event) => {
      const target = e.target;
      if (tagWrapRef.current) {
        if (!tagWrapRef.current.contains(target as Node)) {
          // 利用class 标签 ,判断点击是否来自下拉容器
          if (!document.querySelector('.composite-filter-dropdown')?.contains(target as Node)) {
            setActive(false);
            console.log('tag active is false');
          }
        }
      }
    };
    document.addEventListener('click', hidePop);
    return () => {
      document.removeEventListener('click', hidePop);
    };
  }, []);
  return (
    <div className={`filter-tag ${active ? 'active' : ''}`}>
      <Tooltip content="点击进行修改，按回车完成修改。" position="top" trigger="hover">
        <div ref={tagWrapRef} className="tag-wrap">
          <div className={`tag ${active ? 'tag-active' : ''}`}>
            <span className="tag-name">{label}:</span>
            {type === 'input' ? (
              <InputFilterType
                value={value as string}
                active={active}
                onEnter={(newValue) => onModify(name, newValue)}
                onCancel={() => setActive(false)}
              />
            ) : (
              <MultiFilterType
                value={value as string[]}
                children={children}
                active={active}
                onEnter={(newValue) => onModify(name, newValue)}
                onCancel={() => setActive(false)}
              />
            )}
            <IconClose
              className="tag-close-icon"
              onClick={() => {
                onRemove(name);
              }}
            />
          </div>
        </div>
      </Tooltip>
    </div>
  );
};

export default FilterTag;
