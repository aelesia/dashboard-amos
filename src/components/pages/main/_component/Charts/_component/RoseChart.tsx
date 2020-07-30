import React, { CSSProperties, useEffect, useState } from 'react'
import { Duration } from '@aelesia/commons/dist/src/collections/util/TimeUtil'
import { IllegalStateErr } from '@aelesia/commons/dist/src/error/Error'
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
      { month: 'Jan', count: 1 },
      { month: 'Feb', count: 1 },
      { month: 'Mar', count: 1 },
      { month: 'Apr', count: 1 },
      { month: 'May', count: 1 },
      { month: 'Jun', count: 1 },
      { month: 'Jul', count: 1 },
      { month: 'Aug', count: 1 },
      { month: 'Sep', count: 1 },
      { month: 'Oct', count: 1 },
      { month: 'Nov', count: 1 },
      { month: 'Dec', count: 1 }
    ]
    const map = p.history.map(it => it.post.date._f('MMM'))
    map.forEach(month => {
      const obj = monthlyCount.find(it => it.month === month)
      if (!obj) throw new IllegalStateErr(`Unable to find month: ${month}`)
      obj.count = ++obj.count
    })

    const chart = new Chart({
      container: id,
      autoFit: true,
      height: 400
    })
    chart.data(monthlyCount)
    chart.coordinate('polar')
    chart.axis(false)
    chart.tooltip({
      showMarkers: false
    })
    chart.legend(false)

    chart
      .scale({
        count: {
          type: 'pow',
          exponent: 2,
          formatter: (count: number) => count - 1
        }
      })
      .interval()
      .position('month*count')
      .label('count', {
        offset: -15,
        content: it => (it.count > 1 ? (it.count - 1).toString() : '')
      })
      .color('month')
      .style({
        lineWidth: 1,
        stroke: '#fff'
      })
    chart.point().position('month*count').shape('none').label('month')
    chart.render()
  }, [])
  return <div id={id} />
}
