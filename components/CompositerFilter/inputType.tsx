// @ts-nocheck
import React, { FC, useState, useEffect, useRef } from 'react';
import './style/index';
interface IInputFilter {
  value?: string;
  active?: boolean;
  onEnter: (v: string) => void;
  onCancel: Function;
}
// const InputFilterType: FC<IInputFilter> = ({ value = '', active = false, onEnter, onCancel }, ref) => {
const InputFilterType = React.forwardRef<HTMLInputElement, IInputFilter>(
  ({ value = '', active = false, onEnter, onCancel }, ref) => {
    const tagWrapRef = useRef<HTMLDivElement | null>(null);
    const [inputValue, setInputValue] = useState(value);
    const inputRefDefault = useRef<HTMLInputElement | null>(null);
    let inputRef = ref || inputRefDefault;
    useEffect(() => {
      if (active) {
        inputRef.current?.focus();
      }
    }, [active]);
    useEffect(() => {
      const blurHandle = () => {
        console.log('inpurRef blur');
        onCancel && onCancel();
      };

      inputRef.current?.addEventListener('blur', blurHandle);
      return () => {
        inputRef.current?.removeEventListener('blur', blurHandle);
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
    return (
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
    );
  }
);

export default InputFilterType;
