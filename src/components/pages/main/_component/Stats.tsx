import React, { ReactElement, useEffect } from 'react'
import { Duration } from '@aelesia/commons/dist/src/collections/util/TimeUtil'
import { _ } from '@aelesia/commons'
import { useForceUpdate } from 'src/hooks/useForceUpdate'
import { Alert, Card } from 'antd'
import { cl, sp, sz } from 'src/style/Style'
import { __ } from 'src/components/base/__'
import { Text } from 'src/components/wrapper/RNWrapper'
import { MyCard } from 'src/components/base/MyCard'
import { PostAnalytics, PostHistory } from 'src/data/types/Types.type'
import { prettyTime } from 'src/utils/Format'
import { LinkTo } from '@storybook/addon-links'
import { Link } from 'react-router-dom'
import Modal from 'src/app/Modal/Modal'
import { LongestRecord } from 'src/components/pages/main/_component/LongestRecord'

function median(posts: PostAnalytics[]) {
  const durationArray = posts.map(it => it.duration).sort((num, num2) => num - num2)
  return durationArray[durationArray.length / 2]
}

function average(posts: PostAnalytics[]) {
  const sum = posts.map(it => it.duration).reduce((time, value) => time + value)
  return sum / posts.length
}

const StatCard: React.FC<{
  onClick?: () => void
  children?: ReactElement[] | ReactElement[]
}> = p => {
  return (
    <Card size={'small'} style={{ flexGrow: 1 }} onClick={p.onClick} hoverable={p.onClick != null}>
      <__ style={{ alignItems: 'center' }}>{p.children}</__>
    </Card>
  )
}

export const Stats: React.FC<{
  history: PostAnalytics[]
  longestPost: PostAnalytics
  shortestPost: PostAnalytics
}> = p => {
  const { history } = p

  // const medianDuration = median(history)
  const averageDuration = average(history)

  return (
    <__ row>
      <div
        style={{ backgroundColor: 'red' }}
        onClick={() => {
          Modal.render(<LongestRecord history={p.history} />)
          // Modal.render(() => <Text>Hehe</Text>).then(it => console.log('hehe'))
          // setTimeout(
          //   () => Modal.render(() => <Text>Hoho</Text>).then(it => console.log('hoho')),
          //   1000
          // )
        }}
      >
        Click Me
      </div>
      <StatCard>
        <Text>Longest</Text>
        <Text style={{ fontSize: sz.lg, fontWeight: 300, color: cl.green }}>
          {prettyTime(p.longestPost.duration)}
        </Text>
      </StatCard>
      <StatCard>
        <Text>Shortest</Text>
        <Text style={{ fontSize: sz.lg, fontWeight: 300, color: cl.red }}>
          {prettyTime(p.shortestPost.duration)}
        </Text>
      </StatCard>
      <StatCard>
        <Text>Average</Text>
        <Text style={{ fontSize: sz.lg, fontWeight: 300 }}>{prettyTime(averageDuration)}</Text>
      </StatCard>
    </__>
  )
}
