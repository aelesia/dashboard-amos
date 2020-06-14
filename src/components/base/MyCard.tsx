import React, { CSSProperties, ReactElement } from 'react'
import { View } from 'src/components/wrapper/RNWrapper'
import { sp } from 'src/style/Style'

export const MyCard: React.FC<{ style?: CSSProperties; children: ReactElement }> = p => {
  return (
    <View
      style={[
        {
          borderStyle: 'solid',
          borderWidth: 1,
          borderColor: '#EEE'
          // alignItems: 'center',
          // justifyContent: 'center'
        },
        p.style ?? {}
      ]}
    >
      {p.children}
    </View>
  )
}
