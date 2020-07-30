import React, { useEffect, useState } from 'react'
import { Duration } from '@aelesia/commons/dist/src/collections/util/TimeUtil'
import { _ } from '@aelesia/commons'
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

    chart
      .interval()
      .position('index*value')
      .color('value', '#DCEDC8-#DCEDC8-#42B3D5-#42B3D5-#1A237E-#1A237E-#1A237E-#1A237E')

    chart.render()
  }, [])
  return <div id={id} />
}

// export const MyChartMemo = React.memo(MyChart, () => true)
