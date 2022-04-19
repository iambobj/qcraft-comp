import { IconMore } from '@arco-design/web-react/icon'
import { Dropdown, Menu, Tooltip } from '@arco-design/web-react'
import React, { CSSProperties, useState } from 'react'
import './style/index'

type Option = { [key: string]: number | string | any }
interface ListProps {
  labelKey: string
  valueKey: string
  className: string
  style: CSSProperties
  data: Option[] | undefined
  setAll?: boolean
  showNoGroup?: boolean
  onChange: (value: string, type: string) => void
}

const List = (props: ListProps)  => {
  const {
    labelKey = 'label',
    valueKey = 'value',
    data,
    style,
    className,
    setAll,
    showNoGroup,
    onChange } = props
  const [openKeys, setOpenKeys] = useState<string[]>(['0'])
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['0'])
  const [hoverActive, setHoverActive] = useState('')

  const renderButton = (id: string) => {
    const buttonList = (
      <Menu>
        <Menu.Item key='edit' onClick={handleEdit.bind(null, id)}>
          编辑
        </Menu.Item>
        <Menu.Item key='remove' onClick={handleRemove.bind(null, id)}>
          删除
        </Menu.Item>
      </Menu>
    );
    return (
      <Dropdown droplist={buttonList}>
        <IconMore className='dropdown-btn' />
      </Dropdown>
    )
  }

  const renderListItem = () => {
    const selectMenuAll = selectedKeys.length && selectedKeys[0] === '0'
    const items = data?.map((item: Option) => {
      const label = item[labelKey]
      const value = item[valueKey]
      const ishoverActive = hoverActive === value
      return <Menu.Item key={value} onMouseOver={() => handleOver(value)}>
        <Tooltip content={label} mini triggerProps={{className: 'list-tooltip-wrap'}}>
          <div className='menu-item-title'>{label}</div>
        </Tooltip>
        {ishoverActive ? renderButton(value) : null}
      </Menu.Item>
    })
    return <>
      <Menu
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onClickSubMenu={handleClickAll}
        onClickMenuItem={handleMenuClick}
      >
        {setAll ? <Menu.SubMenu
          key='0'
          title='全部'
          className={selectMenuAll ? 'sub-menu-selected' : ''}
        >
          {items}
          {showNoGroup ?
            <Menu.Item key='noGroup'>
              未分组
            </Menu.Item> : null
          }
        </Menu.SubMenu> : items
        }
      </Menu>
    </>
  }

  function handleClickAll(key: string) {
    if (event?.target && event?.target.className) {
      const className = event?.target.className
      if (typeof event?.target.className === 'object') {
        openKeys.length ? setOpenKeys([]) : setOpenKeys([key])
      } else if (className.indexOf('arco-menu-inline-header') >= 0) {
        onChange(key, 'click')
        setSelectedKeys([key])
      }
    }
  }

  function handleEdit(value: string) {
    onChange(value, 'edit')
  }

  function handleRemove(value: string) {
    onChange(value, 'remove')
  }

  function handleOver(value: string) {
    setHoverActive(value)
  }

  function handleMenuClick(value: string) {
    debugger
    onChange(value, 'click')
    setSelectedKeys([value])
  }

  function handleClean(e: any) {
    if (e.target.className === 'itemWrap') {
      setHoverActive('')
    }
  }

  return <div
    style={style}
    className={className + ' menu-select-list'}
    onMouseOut={handleClean}>
    {renderListItem()}
  </div>
}

export default List;