import React from 'react'
import style from './HasError.module.scss'

export default function HasError(props) {
  return (
    <div className={style['has-error']}><h1 className={style['error-msg']}>{props.message}!</h1></div>
  )
}
