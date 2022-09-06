import { useState, useRef } from 'react'
import { Tag, Input, Col } from 'antd'

import style from './Tags.module.css'

export const Tags = ({ t }) => {
  const [tags, setTags] = useState([])
  const [inputValue, setInputValue] = useState('')
  const [editInputIndex, setEditInputIndex] = useState(-1)
  const [editInputValue, setEditInputValue] = useState('')

  const inputRef = useRef(null)
  const editInputRef = useRef(null)

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag)
    setTags(newTags)
  }

  const handleBackspace = (e) => {
    if (e.code === 'Backspace' && e.target.value === '') {
      const newTags = tags.slice(0, -1)
      setTags(newTags)
    }
  }

  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue])
    }

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

  return (
    <Col className={style.tagContent}>
      {tags?.map((tag, index) => {
        if (editInputIndex === index) {
          return (
            <Input
              ref={editInputRef}
              key={tag}
              value={editInputValue}
              onChange={handleEditInputChange}
              onBlur={handleEditInputConfirm}
              onPressEnter={handleEditInputConfirm}
            />
          )
        }

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
              {tag}
            </span>
          </Tag>
        )
        return tagElem
      })}
      <Input
        id={style.inputAddTag}
        ref={inputRef}
        type="text"
        value={inputValue}
        bordered={false}
        placeholder={tags.length === 0 && t('add_google_place_id')}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
        onKeyDown={handleBackspace}
      />
    </Col>
  )
}
