import { Dropdown, Button, Checkbox } from '@arco-design/web-react';
import React, { useState, useEffect, useRef } from 'react';
import { IMultipleItem } from '.';
import {
  CONTAINER_CLASS_NAME,
  COMMON_DROPDOWN_CLASS_NAME,
} from '.';
import './style/index';
interface IMultiFilter {
  value?: string[];
  active?: boolean;
  onEnter: (v: string[]) => void;
  onCancel: Function;
  children: IMultipleItem[];
}
// const InputFilterType: FC<IInputFilter> = ({ value = '', active = false, onEnter, onCancel }, ref) => {
const MultiFilterType = React.forwardRef<HTMLInputElement, IMultiFilter>(
  ({ value = [], active = false, onEnter, onCancel, children }, ref) => {
    const tagWrapRef = useRef<HTMLDivElement | null>(null);
    const multiRef = useRef<HTMLDivElement | null>(null);
    const [inputValue, setInputValue] = useState('');
    const [checkGroupValue, setCheckGroupValue] = useState<string[]>(value);
    const inputRefDefault = useRef<HTMLInputElement | null>(null);
    let inputRef = ref || inputRefDefault;

    useEffect(() => {
      const valueLabels = value.reduce((acc, v) => {
        const child = children.find((child) => child.value === v);
        acc.push(child.label);
        return acc;
      }, []);
      setInputValue(valueLabels.join('|'));
    }, []);

    useEffect(() => {}, []);
    useEffect(() => {
      if (active) {
        inputRef.current?.focus();
      }
    }, [active]);
    useEffect(() => {
      const hide = (e: Event) => {
        const target = e.target;
        const container =
          document.getElementsByClassName(CONTAINER_CLASS_NAME)[0];
        const dropdowner = document.getElementsByClassName(
          COMMON_DROPDOWN_CLASS_NAME,
        )[0];
        const inContainer = container?.contains(target);
        const inDropdown = dropdowner?.contains(target);
        if (!inContainer && !inDropdown) {
          onCancel && onCancel();
        }
      };
      document.addEventListener('click', hide);
      return () => {
        document.removeEventListener('click', hide);
      };
    }, []);
    const onInput = (e: HTMLInputElement) => {
      const v = e.target.value;
      console.log('onInput', v);
      setInputValue(v);
      if (v.length === 0) {
        onEnter && onEnter(v);
      }
    };
    const onKeyPress = (e: HTMLInputElement) => {
      if (e.which === 13) {
        onEnter && onEnter(inputValue);
        setInputValue('');
      }
    };
    const onCheckboxChange = (values: string[]) => {
      setCheckGroupValue(values);
    };
    const onConfirm = () => {
      onEnter(checkGroupValue);
    };
    return (
      <Dropdown
        popupVisible={active}
        position="bl"
        droplist={
          <div
            ref={multiRef}
            className="composite-filter-dropdown composite-filter-dropdown-checkboxgroup"
          >
            <Checkbox.Group
              className="compositer-multi-type-list"
              onChange={onCheckboxChange}
              value={checkGroupValue}
            >
              {children?.map((child, index: number) => (
                <Checkbox
                  className="compositer-multi-type-item"
                  value={child.value}
                  key={child.value}
                >
                  {child.label}
                </Checkbox>
              ))}
            </Checkbox.Group>
            <div className="multi-type-btns">
              <Button onClick={onCancel} className="multi-type-btn">
                取消
              </Button>
              <Button
                type="primary"
                className="multi-type-btn"
                onClick={onConfirm}
              >
                确认
              </Button>
            </div>
          </div>
        }
      >
        <span className={`input-filter ${active ? 'active' : ''}`}>
          {inputValue}
          <input
            className="real-input"
            type="text"
            ref={inputRef}
            value={inputValue}
            onInput={onInput}
            onKeyPress={onKeyPress}
          ></input>
        </span>
      </Dropdown>
    );
  },
);

export default MultiFilterType;
