import { message } from 'antd'

export const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'

  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!')
  }

  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isLt2M) {
    message.error('Image must be smaller than 2MB!')
  }

  // we must return false here if we want to overwrite default behavior of upload componenet to send post request immedtiately after you upload picture!
  return false
}
