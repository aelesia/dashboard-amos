import React, { CSSProperties, useEffect, useState } from 'react'
import { Duration } from '@aelesia/commons/dist/src/collections/util/TimeUtil'
import { _ } from '@aelesia/commons'
import { useForceUpdate } from 'src/hooks/useForceUpdate'
import { Card } from 'antd'
import { sp, sz } from 'src/style/Style'
import { __ } from 'src/components/base/__'
import { Text, View } from 'src/components/wrapper/RNWrapper'
import { Chart } from '@antv/g2'
import { G2Chart } from 'src/components/lib/g2/G2Chart'
import DataSet from '@antv/data-set'
import { ChartCfg, Datum } from '@antv/g2/esm/interface'
import { v4 as uuid } from 'uuid'
import { PostAnalytics } from 'src/data/types/Types.type'
import { prettyTime } from 'src/utils/Format'

export const RoseChart: React.FC<{ history: PostAnalytics[] }> = p => {
  const [id] = useState(uuid())
  useEffect(() => {
    const monthlyCount = [
      { month: 'January', count: 0 },
      { month: 'February', count: 0 },
      { month: 'March', count: 0 },
      { month: 'April', count: 0 },
      { month: 'May', count: 0 },
      { month: 'June', count: 0 },
      { month: 'December', count: 0 }
    ]
    const map = p.history.map(it => it.post.date._f('MMMM'))
    console.log(map)
    map.forEach(month => {
      const obj = monthlyCount.find(it => it.month === month)
      // @ts-ignore
      obj.count = ++obj.count
    })

    const chart = new Chart({
      container: id,
      autoFit: true,
      height: 500
    })

    chart.data(monthlyCount)
    chart.coordinate('theta', {
      radius: 0.75
    })

    chart.tooltip({
      showTitle: false,
      showMarkers: false
    })

    chart
      .interval()
      .position('count')
      .color('month')
      .label('month', {
        offset: -50,
        style: {
          textAlign: 'center',
          fontSize: sz.md,
          shadowBlur: 10,
          shadowColor: 'rgba(0, 0, 0)',
          fill: '#fff'
        }
      })
      .adjust('stack')

    chart.interaction('element-active')

    chart.render()
  }, [])
  return <div style={{ padding: sp.sm }} id={id} />
}
