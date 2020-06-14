import React, { useEffect } from 'react'
import { Duration } from '@aelesia/commons/dist/src/collections/util/TimeUtil'
import { _ } from '@aelesia/commons'
import { useForceUpdate } from 'src/hooks/useForceUpdate'
import { Card } from 'antd'
import { sp } from 'src/style/Style'
import { __ } from 'src/components/base/__'
import { Text, View } from 'src/components/wrapper/RNWrapper'
import { Chart } from '@antv/g2'
import { G2Chart } from 'src/components/lib/g2/G2Chart'
import DataSet from '@antv/data-set'

export const MyChart: React.FC<{
  timestampList: number[]
}> = p => {
  const data = p.timestampList.map(value => {
    return {
      value
    }
  })
  const ds = new DataSet()
  const dv = ds.createView().source(data)
  dv.transform({
    type: 'bin.histogram',
    field: 'value',
    binWidth: 2,
    as: ['value', 'count']
  })

  return (
    <View style={{ height: 200 }}>
      <G2Chart
        style={{}}
        data={dv}
        padding={'auto'}
        interval={'a*sold'}
        autoFit={true}
        options={{}}
      />
    </View>
  )
}
