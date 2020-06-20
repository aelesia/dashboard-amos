import React, { CSSProperties, useEffect, useMemo, useState } from 'react'
import { Duration } from '@aelesia/commons/dist/src/collections/util/TimeUtil'
import { _ } from '@aelesia/commons'
import { sp } from 'src/style/Style'
import { Chart } from '@antv/g2'
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
      height: 400
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
      }
    })

    chart.interval().position('index*value')

    chart.render()
  }, [])
  return <div id={id} />
}

// export const MyChartMemo = React.memo(MyChart, () => true)
