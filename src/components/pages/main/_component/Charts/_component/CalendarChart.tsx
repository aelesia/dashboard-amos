import React, { useEffect, useState } from 'react'
import { TimeUtil } from '@aelesia/commons/dist/src/collections/util/TimeUtil'
import { Chart } from '@antv/g2'
import DataSet from '@antv/data-set'
import { v4 as uuid } from 'uuid'
import { PostAnalytics } from 'src/data/types/Types.type'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

export const CalendarChart: React.FC<{ history: PostAnalytics[] }> = p => {
  const [id] = useState(uuid())

  useEffect(() => {
    const { DataView } = DataSet

    const data: any = {}
    const start = new Date('2019-12-01')

    for (let i = 0; i < 365; i++) {
      data[start.add(TimeUtil.days(i)).toDateString()] = 0
    }
    p.history.forEach(it => {
      data[it.post.date.toDateString()] = ++data[it.post.date.toDateString()]
    })
    const array: any[] = []
    Object.entries(data).forEach((value, index) => {
      array.push({
        date: value[0],
        count: value[1]
      })
    })
    function getMonthWeek(date: Date) {
      const year = date.getFullYear()
      const month = date.getMonth()
      const monthFirst = new Date(year, month, 0)
      const intervalDays = Math.round((date.getTime() - monthFirst.getTime()) / 86400000)
      const index = Math.floor((intervalDays + monthFirst.getDay()) / 7)
      return index
    }
    array.forEach(function (obj) {
      const date = new Date(obj['date'])
      const month = date.getMonth()
      obj.month = MONTHS[month]
      obj.day = date.getDay()
      obj.week = getMonthWeek(date).toString()
    })

    // 对数据进行排序
    const dv = new DataView()
    dv.source(array).transform({
      type: 'sort-by',
      fields: ['day'],
      order: 'ASC'
    })

    const chart = new Chart({
      container: id,
      autoFit: true,
      height: 500,
      padding: [20, 0, 50, 0]
    })
    chart.data(dv.rows)
    chart.scale({
      day: {
        type: 'cat'
      },
      week: {
        type: 'cat',
        values: ['5', '4', '3', '2', '1', '0']
      },
      count: {
        type: 'linear',
        min: 0,
        max: 4,
        sync: true
      },
      date: {
        type: 'time'
      }
    })

    chart.axis(false)
    chart.tooltip({
      title: 'date',
      showMarkers: false
    })
    chart.facet('list', {
      fields: ['month'],
      cols: 4,

      eachView: view => {
        view
          .polygon()
          .position('day*week')
          .color('count', '#F6F6F6-#BAE7FF-#1890FF-#0050B3')
          .style({
            lineWidth: 1,
            stroke: '#fff'
          })
      }
    })
    chart.render()
  }, [])

  return <div id={id} />
}
