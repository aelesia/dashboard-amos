import React, { CSSProperties, useEffect, useState } from 'react'
import { Chart } from '@antv/g2'
import { ChartCfg, Datum } from '@antv/g2/esm/interface'
import { v4 as uuid } from 'uuid'
import { sp } from 'src/style/Style'

export const G2Chart: React.FC<
  {
    data: Datum[]
    interval: string
    style?: CSSProperties
  } & Omit<ChartCfg, 'container'>
> = p => {
  const { data, interval, ...cfg } = p

  const [id] = useState(uuid())
  useEffect(() => {
    const chart = new Chart({
      ...{ container: id },
      ...cfg
    })
    chart.data(data)
    chart.interval().position(interval)
    chart.render()
  }, [])
  // const padding =
  const style = Object.assign(
    { flexGrow: cfg.autoFit ? 1 : 0, marginBottom: -10, padding: 10 },
    cfg.style
  )
  return <div id={id} style={style} />
}
