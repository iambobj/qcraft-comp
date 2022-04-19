// @ts-nocheck
import { Dropdown, Menu } from '@arco-design/web-react';
import { IconSearch } from '@arco-design/web-react/icon';
import React, { useRef, FC, useState, useEffect } from 'react';
import './style/index';
import InputFilterType from './inputType';
import MultiFilterType from './multiType';
import FilterTag from './tag';
export interface IMultipleItem {
  label: string;
  value: string;
}

export type tagType = 'input' | 'multiple';
interface IFilter {
  type: tagType;
  label: string;
  name: string;
  children?: IMultipleItem[];
}

export interface ICompositerValues {
  [prop: string]: string | string[] | number[];
}
interface ICompositerFilter {
  defaultFilterName: string;
  filters: IFilter[];
  onChange: (values: ICompositerValues) => void;
  style?: React.CSSProperties;
}
interface ITag {
  type: tagType;
  name: string;
  value: string | string[];
  children?: IMultipleItem[];
  label: string;
}
export const CONTAINER_CLASS_NAME = 'compositer-filter';
export const CONTAINER_CLASS_NAME_ACTIVE = 'active';
export const COMMON_DROPDOWN_CLASS_NAME = 'composite-filter-dropdown';
const CompositerFilter: FC<ICompositerFilter> = ({
  defaultFilterName,
  filters,
  onChange,
  style = {},
}) => {
  const [tags, setTags] = useState<ITag[]>([]);
  const [activeFilterInfo, setActiveFilterInfo] = useState<IFilter | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const placeholderRef = useRef<HTMLSpanElement | null>(null);
  const suffixInputRef = useRef<HTMLInputElement | null>(null);
  const [defaultSuffixInputActive, setDefaultSuffixInputActive] = useState(false);
  const suffixInputFiterTypeRef = useRef<HTMLInputElement | null>(null);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const defaultFilterInfo = filters.find((filter) => filter.name === defaultFilterName);
  const PLACEHOLDER = {
    empty: `默认按${defaultFilterInfo?.label}搜索`,
    waitingValue: '请输入回车确认',
    more: '添加筛选条件',
  };
  const getFiltersCanUse = () => {
    const filtersCanUse: IFilter[] = [];
    filters.forEach((filter) => {
      const filterName = filter.name;
      if (!tags.find((tag) => tag.name === filterName)) {
        filtersCanUse.push(filter);
      }
    });
    return filtersCanUse;
  };

  useEffect(() => {
    contentRef.current?.addEventListener('click', (e) => {
      // e.stopPropagation();
      const triggeerDom = [contentRef.current, suffixInputRef.current, placeholderRef.current];
      if (e.target === contentRef.current) {
        console.log('suffixInputFiterTypeRef focus');
        suffixInputFiterTypeRef.current?.focus();
      }
      if (!activeFilterInfo && triggeerDom.includes(e.target)) {
        // 用户没有选择筛选项时，才弹出筛选项。所以每次enter 后，需要重置activeFilterInfo 为null
        setDropdownVisible(true);
        setDefaultSuffixInputActive(true);
        focusSuffixInput();
      }
    });
  }, []);
  useEffect(() => {
    const hide = (e: Event) => {
      const target = e.target;
      const dropdowner = document.getElementsByClassName(COMMON_DROPDOWN_CLASS_NAME)[0];
      const inDropdown = dropdowner?.contains(target);
      if (
        // target?.className !== suffixInputRef.current?.className &&
        target !== suffixInputRef.current &&
        target !== suffixInputFiterTypeRef.current &&
        target !== contentRef.current &&
        target !== placeholderRef.current &&
        !inDropdown
      ) {
        //suffixInputRef.current?.blur();
        setDropdownVisible(false);
        setDefaultSuffixInputActive(false);
      }
    };
    const switchContainerStatus = (e: Event) => {
      const target = e.target;
      const container = document.getElementsByClassName(CONTAINER_CLASS_NAME)[0];
      const dropdowner = document.getElementsByClassName(COMMON_DROPDOWN_CLASS_NAME)[0];
      const inContainer = container?.contains(target);
      const inDropdown = dropdowner?.contains(target);
      if (inContainer) {
        container.classList.add(CONTAINER_CLASS_NAME_ACTIVE);
      } else {
        if (!inDropdown) {
          container?.classList.remove(CONTAINER_CLASS_NAME_ACTIVE);
        }
      }
    };
    document.addEventListener('click', hide);
    document.addEventListener('click', switchContainerStatus);
    return () => {
      document.removeEventListener('click', hide);
      document.removeEventListener('click', switchContainerStatus);
    };
  }, []);
  useEffect(() => {
    //if (activeFilterInfo) {
    // 重置input 的宽度，使得input 占满剩余空间
    const containerWidth = contentRef.current?.offsetWidth || 0;
    const suffixInputFilterBoxLeft =
      suffixInputFiterTypeRef.current?.getBoundingClientRect().left || 0;
    if (suffixInputFiterTypeRef.current) {
      suffixInputFiterTypeRef.current.style.width =
        containerWidth - suffixInputFilterBoxLeft + 'px';
    }
    // }
  }, [activeFilterInfo]);
  const focusSuffixInput = () => {
    console.log('suffixInputRef focus');
    // TO RECOVER FOR MULTI
    suffixInputRef.current?.focus();
  };
  const getSuffixPlaceholder = () => {
    if (activeFilterInfo) {
      return PLACEHOLDER.waitingValue;
    }
    if (tags.length > 0) {
      return PLACEHOLDER.more;
    }
    return PLACEHOLDER.empty;
  };
  const onChooseFitler = (filter: IFilter) => {
    setActiveFilterInfo(filter);
    setDropdownVisible(false);
    setDefaultSuffixInputActive(false);
    focusSuffixInput();
  };
  const addOneFilter = (value: string | string[]) => {
    if (value.length) {
      const newTags = [...tags];
      const filterInfo = activeFilterInfo || defaultFilterInfo;
      const target = newTags.find((tag) => tag.name === filterInfo?.name);
      if (target) {
        target.value = value;
      } else {
        newTags.push({
          label: filterInfo?.label as string,
          name: filterInfo?.name as string,
          type: filterInfo?.type as tagType,
          value,
          children: (filterInfo?.children as IMultipleItem[]) || [],
        });
      }
      setTags(newTags);
      onFilterChange(newTags);
    }
    setDropdownVisible(true);
    setDefaultSuffixInputActive(true);
    cancelAddAction();
  };

  const onFilterChange = (tags: ITag[]) => {
    const result: ICompositerValues = {};
    tags.forEach((tag) => {
      result[tag.name] = tag.value;
    });
    onChange(result);
  };
  const onModify = (name: string, v: string) => {
    console.log('modify end');
    const newTags: ITag[] = [];
    tags.forEach((tag) => {
      if (tag.name === name) {
        tag.value = v;
        if (v) {
          newTags.push(tag);
        }
      } else {
        newTags.push(tag);
      }
    });
    onFilterChange(newTags);
    setTags(newTags);
  };
  const onRemove = (name: string) => {
    const newTags = tags.filter((tag) => tag.name !== name);
    onFilterChange(newTags);
    setTags(newTags);
  };
  const cancelAddAction = () => {
    console.log('set active filter info to null');
    setActiveFilterInfo(null);
  };
  const renderSuffixFilter = () => {
    if (activeFilterInfo?.type === 'input') {
      return (
        <InputFilterType
          key="suffixFilterInput"
          active={true}
          onEnter={addOneFilter}
          onCancel={cancelAddAction}
          ref={suffixInputFiterTypeRef}
        />
      );
    } else if (activeFilterInfo?.type === 'multiple') {
      return (
        <MultiFilterType
          key="suffixFilterMulti"
          active={true}
          onEnter={addOneFilter}
          onCancel={cancelAddAction}
          children={activeFilterInfo.children}
          ref={suffixInputFiterTypeRef}
        />
      );
    }
  };
  const filtersCanUse = getFiltersCanUse();
  return (
    <div className={CONTAINER_CLASS_NAME} style={style}>
      <div className="content " ref={contentRef}>
        {tags.map((tag, index) => {
          return <FilterTag {...tag} onModify={onModify} onRemove={onRemove} key={tag.value} />;
        })}
        <div className="suffix-condition">
          <Dropdown
            popupVisible={dropdownVisible}
            position="bl"
            droplist={
              filtersCanUse.length ? (
                <div className={`suffix-dropdown-content ${COMMON_DROPDOWN_CLASS_NAME}`}>
                  <Menu
                    className="filter-type-list"
                    defaultSelectedKeys={[defaultFilterInfo?.name as string]}
                  >
                    {filtersCanUse.map((filter, index) => (
                      <Menu.Item
                        className="filter-type-item"
                        key={filter.name}
                        onClick={() => onChooseFitler(filter)}
                      >
                        {filter.label}
                      </Menu.Item>
                    ))}
                  </Menu>
                </div>
              ) : (
                <></>
              )
            }
            triggerProps={{ className: 'composite-filter-dropdown' }}
          >
            <div>
              {activeFilterInfo?.label ? (
                <span className="suffix-title">{activeFilterInfo?.label}:</span>
              ) : null}
              <div className="suffix-content">
                {
                  //activeFilterInfo ? renderSuffixFilter() : <input className="suffix-input" ref={suffixInputRef} />
                }
                {activeFilterInfo ? (
                  renderSuffixFilter()
                ) : (
                  <InputFilterType
                    active={defaultSuffixInputActive}
                    onEnter={addOneFilter}
                    onCancel={() => {} /*cancelAddAction*/}
                    ref={suffixInputRef}
                  />
                )}
              </div>
              {/*<div className="composition-search-drop-multiple">
                <div>这是复选框下拉列表</div>
               </div>*/}
              <span className="placeholder" ref={placeholderRef}>
                {getSuffixPlaceholder()}
              </span>
            </div>
          </Dropdown>
        </div>
      </div>
      <IconSearch className="search-icon" />
    </div>
  );
};

export default CompositerFilter;
