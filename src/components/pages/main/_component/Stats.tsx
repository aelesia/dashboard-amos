import React, { ReactElement } from 'react'
import { Card } from 'antd'
import { cl, sz, wt } from 'src/style/Style'
import { __ } from 'src/components/base/__'
import { Text } from 'src/components/wrapper/RNWrapper'
import { PostAnalytics } from 'src/data/types/Types.type'
import { prettyTime } from 'src/utils/Format'
import Modal from 'src/app/Modal/Modal'
import { PostTimeline } from 'src/components/pages/main/_component/PostTimeline'
import { RightOutlined } from '@ant-design/icons'

/**
 * FIXME: Commented Code
 * Unsure if this code is still needed to calculate median
 * Remove by: 1st Jan 2021
 */
// function median(posts: PostAnalytics[]) {
//   const durationArray = posts.map(it => it.duration).sort((num, num2) => num - num2)
//   return durationArray[durationArray.length / 2]
// }

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
      <__ row>
        <__ style={{ flexGrow: 1, alignItems: 'center' }}>{p.children}</__>
        {p.onClick && <RightOutlined style={{ margin: 'auto', fontSize: 20, color: cl.grey4 }} />}
      </__>
    </Card>
  )
}

export const Stats: React.FC<{
  history: PostAnalytics[]
  longestPost: PostAnalytics
  shortestPost: PostAnalytics
}> = p => {
  const averageDuration = average(p.history)
  const sortedAsc = p.history.slice(0).sort((a, b) => a.duration - b.duration)
  const shortest5 = sortedAsc.slice(0, 5)
  const longest5 = sortedAsc.reverse().slice(0, 5)

  return (
    <__ row>
      <StatCard onClick={() => Modal.render(<PostTimeline postList={longest5} color={'green'} />)}>
        <Text style={css.statHeader}>Longest</Text>
        <Text style={{ fontSize: sz.lg, fontWeight: 300, color: cl.green }}>
          {prettyTime(p.longestPost.duration)}
        </Text>
      </StatCard>
      <StatCard onClick={() => Modal.render(<PostTimeline postList={shortest5} color={'red'} />)}>
        <Text style={css.statHeader}>Shortest</Text>
        <Text style={{ fontSize: sz.lg, fontWeight: 300, color: cl.red }}>
          {prettyTime(p.shortestPost.duration)}
        </Text>
      </StatCard>
      <StatCard>
        <Text style={css.statHeader}>Average</Text>
        <Text style={{ fontSize: sz.lg, fontWeight: 300 }}>{prettyTime(averageDuration)}</Text>
      </StatCard>
    </__>
  )
}

const css = {
  statHeader: {
    color: cl.grey2,
    fontWeight: wt._300
  }
}
