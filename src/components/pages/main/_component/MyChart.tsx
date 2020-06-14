import React, { CSSProperties, useEffect, useState } from 'react'
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
import { ChartCfg, Datum } from '@antv/g2/esm/interface'
import { v4 as uuid } from 'uuid'
import { PostAnalytics } from 'src/data/types/Types.type'
import { prettyTime } from 'src/utils/Format'

export const MyChart: React.FC<{ history: PostAnalytics[] }> = p => {
  const [id] = useState(uuid())
  useEffect(() => {
    const values = p.history.reverse().map((it, index) => ({
      index: it.post.date._f('DD MMM YY HH:mm'),
      value: it.duration / _.time.ONE_HOUR
    }))

    const chart = new Chart({
      container: id,
      autoFit: true,
      height: 500
    })

    chart.data(values)
    chart.scale({
      value: {
        type: 'pow',
        exponent: 2.5,
        alias: 'Duration',
        formatter: (duration: number) => prettyTime(duration * _.time.ONE_HOUR)
      },
      index: {
        showLast: true,
        alias: 'Date'
        // type: 'category',
        // formatter: (date: Date) => date._f('ddd, DD MMM YYYY HH:mm:ss')
      }
    })

    // chart.area().position('index*value')
    // chart.line().position('index*value').shape('smooth')
    // chart.point().position('index*value')
    chart.interval().position('index*value')

    chart.render()
  }, [])
  return <div style={{ padding: sp.sm }} id={id} />
}
