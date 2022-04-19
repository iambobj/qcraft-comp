import React, { CSSProperties, useState, useRef, useEffect } from "react"
import { Tag, DatePicker, Button, Select as  Selector } from "@arco-design/web-react"
import dayjs, { Dayjs } from 'dayjs'
import { cloneDeep } from 'lodash-es'
import { IconCalendar } from "@arco-design/web-react/icon"
// import { default as Selector } from '../Select';
import { SelectHandle } from "@arco-design/web-react/es/Select/interface"
import "./style/index"

interface MultipleProps {
  value?: number[]
  format?: string
  selectProps?: { [key: string]: any }
  datePickerProps?: { [key: string]: any }
  onChange?: (value: number[]) => void
}

type renderTagInit = {
  value: number
  label: React.ReactNode
  closable: boolean
  onClose: () => void
}

function getTimestamp(value: Dayjs) {
  return value.startOf("day").valueOf()
}

function get1DayBefore(): Dayjs {
  const date = dayjs().subtract(1, "days");
  return date
}

const  MultipleDatePicker = (props: MultipleProps)  => {
  const [open, setOpen] = useState(false)
  const dateRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<SelectHandle>(null);
  const { value: selectedDate = [], format = 'YYYY-MM-DD', selectProps, datePickerProps = {}, onChange } = props

  const onValueChange = (_dateString: string, date: Dayjs | null) => {
    if (date) {
      const t = getTimestamp(date)
      const index = selectedDate.indexOf(t)
      const clone = cloneDeep(selectedDate)
      if (index > -1) {
        clone.splice(index, 1)
      } else {
        clone.push(t)
      }
      onChange && onChange(clone)
    }
  }

  const dateRender = (currentDate: Dayjs) => {
    const isSelected = selectedDate.includes(dayjs(currentDate).startOf("day").valueOf())
    let selectStyle: CSSProperties = isSelected ?
      {
        backgroundColor: "rgb(22, 93, 255)",
        color: "#fff",
        margin: "auto",
        borderRadius: "24px"
      }
      : {}
    return (<div className='arco-picker-date'>
      <div className='arco-picker-date-value' style={selectStyle} >
        {currentDate.date()}
      </div >
    </div>)
  }

  const renderTag = (props: renderTagInit) => {
    const { value, label, onClose } = props
    const handleClose = () => {
      onClose()
      setOpen(false)
      onChange && onChange(selectedDate.filter((t) => t !== value))
    }
    return (
      <Tag className='arco-input-tag-tag' onClose={handleClose} style={{ margin: '2px 6px 2px 0' }}>
        {typeof value === 'number' ? dayjs(value).format(format) : label}
      </Tag>
    )
  }
  
  useEffect(()=>{
    const hideSelectDropdown = (e:MouseEvent) => {
        const target = e.target as Node;
        if(dateRef.current as HTMLDivElement && !(dateRef.current as HTMLDivElement).contains(target) 
           && !selectRef.current?.dom.contains(target)
        ){
          setOpen(false)
        }
    };
    document.addEventListener('click', hideSelectDropdown);
    return ()=>{
      document.removeEventListener('click', hideSelectDropdown);
    }
  }, [])

  return (
    <Selector
      allowClear
      ref={selectRef}
      placeholder={"请选择日期"}
      {...selectProps}
      mode="multiple"
      value={selectedDate}
      popupVisible={open}
      onClear={() => onChange && onChange([])}
      renderTag={renderTag}
      suffixIcon={<IconCalendar />}
      onFocus={() => setOpen(true)}
      dropdownMenuClassName={"multipleDropdownWrap"}
      dropdownRender={() => {
        return (
          <div className="multipleDropdownWrap" ref={dateRef}>
            <DatePicker
              popupVisible
              {...datePickerProps}
              triggerElement={null}
              format={(_value) => ""}
              onChange={onValueChange}
              value={"" as any}
              showNowBtn={false}
              dateRender={dateRender}
              style={{ ...datePickerProps.style }}
              disabledDate={(current: Dayjs) => current.isBefore(get1DayBefore())}
              getPopupContainer={() =>
                document.getElementsByClassName("multipleDropdownWrap")[0] as HTMLElement
              }

            />
            <div className='flex justify-end items-center' style={{ padding: '10px 12px' }}>
              <Button
                style={{ fontSize: 12, padding: '0 6px' }}
                type='primary'
                size='mini'
                onClick={() => setOpen(false)}
              >
                确定
              </Button>
            </div>
          </div>
        )
      }}
    />
  )
}

export default MultipleDatePicker