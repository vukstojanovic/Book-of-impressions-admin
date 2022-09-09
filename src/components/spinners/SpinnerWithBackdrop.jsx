import { Spin } from 'antd'

import style from './SpinnerWithBackdrop.module.css'
export const SpinnerWithBackdrop = () => {
  return (
    <div className={style.spinner}>
      <Spin />
    </div>
  )
}
