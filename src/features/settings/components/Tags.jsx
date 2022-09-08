import { useEffect, useState, useRef } from 'react'
import { Typography, Tag, Input, Col, Tooltip } from 'antd'

import style from './Tags.module.css'

export const Tags = ({ t, onChange, placeholderText, value }) => {
  const { Text } = Typography

  const [tags, setTags] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [editInputIndex, setEditInputIndex] = useState(-1)
  const [editInputValue, setEditInputValue] = useState('')

  const [errorMessage, setErrorMessage] = useState(true)
  const inputRef = useRef(null)
  const editInputRef = useRef(null)

  const triggerChange = (changedValue) => {
    onChange?.(changedValue)
  }
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag)
    setTags(newTags)
    triggerChange([...newTags])
  }

  const handleBackspace = (e) => {
    if (e.code === 'Backspace' && e.target.value === '') {
      const newTags = tags.slice(0, -1)
      setTags(newTags)
      triggerChange([...newTags])
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleInputConfirm = (e) => {
    e.preventDefault()
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue])
      triggerChange([...tags, inputValue])
      setErrorMessage('')
      setInputValue('')
      return
    }
    if (!inputValue) {
      setErrorMessage(t('empty_tag_field'))
      setInputValue('')
      return
    }
    setErrorMessage(t('equal_value_tag_field'))
    setInputValue('')
  }

  const handleEditInputChange = (e) => {
    setEditInputValue(e.target.value)
  }

  const handleEditInputConfirm = () => {
    const newTags = [...tags]
    newTags[editInputIndex] = editInputValue
    setTags(newTags)
    setEditInputIndex(-1)
    setInputValue('')
  }

  useEffect(() => {
    setTags(value)
  }, [value])

  return (
    <>
      <Col className={style.tagContent}>
        {tags?.map((tag, index) => {
          if (editInputIndex === index) {
            return (
              <Input
                ref={editInputRef}
                key={tag}
                value={editInputValue}
                onChange={handleEditInputChange}
                onPressEnter={handleEditInputConfirm}
              />
            )
          }
          const isLongTag = tag.length > 20

          const tagElem = (
            <Tag id={style.tagStyle} key={tag} closable={true} onClose={() => handleClose(tag)}>
              <span
                style={{ fontSize: '1rem' }}
                onDoubleClick={(e) => {
                  if (index !== 0) {
                    setEditInputIndex(index)
                    setEditInputValue(tag)
                    e.preventDefault()
                  }
                }}
              >
                {isLongTag ? `${tag.slice(0, 20)}...` : tag}
              </span>
            </Tag>
          )

          return isLongTag ? (
            <Tooltip title={tag} key={tag}>
              {tagElem}
            </Tooltip>
          ) : (
            tagElem
          )
        })}
        <Input
          id={style.inputAddTag}
          ref={inputRef}
          type="text"
          value={inputValue}
          bordered={false}
          placeholder={placeholderText}
          onChange={handleInputChange}
          onPressEnter={handleInputConfirm}
          onKeyDown={handleBackspace}
        />
      </Col>
      {errorMessage && <Text type="danger">{errorMessage}</Text>}
    </>
  )
}
