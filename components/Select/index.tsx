import React from 'react';
import { Select as ArcoSelect, SelectProps, Tag } from "@arco-design/web-react";
import { OptionInfo, SelectHandle } from "@arco-design/web-react/es/Select/interface";
import { IconDown } from "@arco-design/web-react/icon";
import { useEffect, useState } from "react";
import './style/index'

type renderTagInit = {
  value: number
  label: React.ReactNode
  closable: boolean
  onClose: () => void
}

type SelectorProps = SelectProps & React.RefAttributes<SelectHandle>

const tagLimit = 9
const selectorTagWidth = 100
const tagOffsetWidth = 120
const sufferWidth = 20
const omitWidth = 50

 function Select(seletorProps: SelectorProps) {
  const { mode, value, options, children, style = { width: 'auto' }, onChange } = seletorProps
  const [maxTagCount, setMaxTagCount] = useState<number>(0)
  const [selectValue, setSelectValue] = useState(value)

  const getCount = (maxCount?: number[]) => {
    const { width = 0 } = style
    if (typeof width === 'number' && width > 0) {
      if (maxCount) {
        let count = 0
        let _width = width
        for (let i = 0; i < maxCount.length; i++) {
          if (_width - maxCount[i] > (sufferWidth + omitWidth)) {
            count++;
            _width = _width - maxCount[i]
          } else break;
        }
        return count
      } else {
        return Math.floor((width - sufferWidth) / tagOffsetWidth)
      }
    } else {
      return 1
    }
  }

  const checkCnStr = (str: string) => {
    return /[x00-\xff]/.test(str)
  }

  const countBiteLen = (str: string) => {
    let count = 0
    for (let i = 0; i < str.length; i++) {
      let chr = str.charAt(i)
      if (checkCnStr(chr)) {
        count++
      } else {
        count += 2
      }
    }
    return count
  }

  const getTagCount = (fullValue: (OptionInfo & { label?: string, value?: string | number })[]) => {
    let maxCount: number[] = []
    fullValue.forEach((item) => {
      const { children = '', label = '' } = item
      const count = countBiteLen((children || label) as string)
      maxCount.push(count > tagLimit ? 120 : count * 10)
    })
    setMaxTagCount(getCount(maxCount))
  }

  useEffect(() => {
    setSelectValue(value)
    if (mode === 'multiple' && options) {
      const fullValue: any[] = options.filter((item) => {
        if (Array.isArray(value) && typeof item === 'object') {
          const itemValue: string | number = item.value
          return value.includes(itemValue as never)
        } else {
          return false
        }
      }) || []
      getTagCount(fullValue)
    }
  }, [value])

  const cutStr = (str: string, length: number) => {
    let result = ''
    let strlen = str.length // 字符串长度
    let chrlen = str.replace(/[^x00-\xff]/g, '**').length // 字节长度

    if (chrlen <= length) { return str }

    for (let i = 0, j = 0; i < strlen; i++) {
      let chr = str.charAt(i)
      if (checkCnStr(chr)) {
        j++ // ascii码为0-255，一个字符就是一个字节的长度
      } else {
        j += 2 // ascii码为0-255以外，一个字符就是两个字节的长度
      }
      if (j <= length) { // 当加上当前字符以后，如果总字节长度小于等于L，则将当前字符真实的+在result后
        result += chr
      } else { // 反之则说明result已经是不拆分字符的情况下最接近L的值了，直接返回
        return result + '...'
      }
    }
  }

  const renderTag = (props: renderTagInit) => {
    const {  label, closable, onClose } = props
    const handleClose = () => {
      onClose()
    }
    const viewStr = cutStr(label as string, tagLimit)
    return (
      <Tag
        onClose={handleClose}
        closable={closable}
        style={{ maxWidth: selectorTagWidth }}
        className='arco-input-tag-tag ellipsis-line'>
        {viewStr}
      </Tag>
    )
  }

  const handleSelectChange = (value: any, fullValue: OptionInfo[]) => {
    setSelectValue(value)
    // 获取当前字节总长度
    if (mode === 'multiple') {
      getTagCount(fullValue)
    }

    onChange && onChange(value, fullValue)
  }

  return <ArcoSelect
    arrowIcon={<IconDown />}
    renderTag={renderTag}
    {...seletorProps}
    filterOption={(inputValue, option) =>
      option.props.children.indexOf(inputValue) >= 0
    }
    value={selectValue}
    maxTagCount={maxTagCount}
    onChange={handleSelectChange}>
    {children}
  </ArcoSelect>
}

export default Select;