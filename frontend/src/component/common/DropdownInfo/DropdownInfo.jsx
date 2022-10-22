import './DropdownInfo.css'

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import React, { useState } from 'react'
import { Modal } from '@mui/material'

const DropdownInfo = ({ data, rowName }) => {
  const [showBody, setShowBody] = useState(false)
  const [attributes, setAttributes] = useState(Object.keys(data))

  const displayData = (data) => {
    let _data = data
    if (Array.isArray(data)) {
      _data = data.reduce((prev, cur) => {
        return prev + ', ' + cur
      })
    }
    return _data
  }

  return (
    <div className={'container'}>
      <div
        className={'title'}
        onClick={() => setShowBody((prev) => !prev)}
        style={{ cursor: 'pointer' }}
      >
        <div style={{ fontWeight: 600 }}>{rowName}</div>
        <div>{showBody ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}</div>
      </div>
      <div className={`${showBody ? 'body' : 'bodyClose'}`}>
        {showBody && (
          <>
            {attributes.map((attribute) => {
              if (
                attribute.length == 0 ||
                !data[attribute] ||
                data[attribute].length == 0
              )
                return
              return (
                <div className={'attribute'}>
                  {data[attribute] && data[attribute].length > 0 && (
                    <>
                      <span className={'attributeName'}>{attribute}:</span>
                      <span className={'attributeValue'}>
                        {data[attribute] && data[attribute].length > 0
                          ? displayData(data[attribute])
                          : 'Undefined'}
                      </span>
                    </>
                  )}
                </div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}

export default DropdownInfo
