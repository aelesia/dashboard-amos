import React, { CSSProperties, HTMLAttributes } from 'react'
import { sp, StyleSpace } from 'src/style/Style'
import { View, ViewProps } from 'src/components/wrapper/RNWrapper'

type P = {
  row?: boolean
  padding?: StyleSpace
} & ViewProps

// export const _: React.FC<P> = p => {
//   let propStyle: StyleProp<ViewStyle> = {}
//   if (p.style instanceof Object) {
//     propStyle = p.style
//   }
//   let style = [
//     {
//       flexDirection: p.row ? 'row' : 'column',
//       marginVertical: p.mv ? gap[p.mv] : 0
//     } as ViewStyle,
//     propStyle
//   ]
//   return <View {...p} style={style} />
// }
export const __: React.FC<
  {
    row?: boolean
    pd?: StyleSpace
  } & ViewProps
> = p => {
  const { row, pd, ...props } = p

  let style: CSSProperties = {
    flexDirection: row ? 'row' : 'column',
    padding: pd ? sp[pd] : 0
  }
  return <View {...props} style={Object.assign(style, props.style)} />
}
