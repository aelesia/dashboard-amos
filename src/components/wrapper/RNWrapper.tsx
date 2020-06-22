import React, { CSSProperties, DetailedHTMLFactory, HTMLAttributes } from 'react'

type CSSArray<T> = Omit<T, 'style'> & { style?: CSSProperties | CSSProperties[] }

export type ViewProps = CSSArray<HTMLAttributes<HTMLDivElement>>
export function View(props: ViewProps) {
  const style: CSSProperties = { display: 'flex', flexDirection: 'column' }
  if (style) {
    if (Array.isArray(props.style)) {
      props.style.forEach(s => {
        Object.assign(style, s)
      })
    } else {
      Object.assign(style, props.style)
    }
  }
  return <div {...props} style={style} />
}

export type TextProps = CSSArray<HTMLAttributes<HTMLSpanElement>>
export function Text(props: HTMLAttributes<HTMLSpanElement>) {
  const style: CSSProperties = { fontFamily: 'Roboto' }
  Object.assign(style, props.style)
  return <div {...props} style={style} />
}
