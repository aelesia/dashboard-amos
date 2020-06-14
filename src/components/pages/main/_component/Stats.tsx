import React, { useEffect } from 'react'
import { Duration } from '@aelesia/commons/dist/src/collections/util/TimeUtil'
import { _ } from '@aelesia/commons'
import { useForceUpdate } from 'src/hooks/useForceUpdate'
import { Card } from 'antd'
import { cl, sp, sz } from 'src/style/Style'
import { __ } from 'src/components/base/__'
import { Text } from 'src/components/wrapper/RNWrapper'
import { MyCard } from 'src/components/base/MyCard'
import { PostAnalytics, PostHistory } from 'src/data/types/Types.type'
import { prettyTime } from 'src/utils/Format'

function median(posts: PostAnalytics[]) {
  const durationArray = posts.map(it => it.duration).sort((num, num2) => num - num2)
  return durationArray[durationArray.length / 2]
}

function average(posts: PostAnalytics[]) {
  const sum = posts.map(it => it.duration).reduce((time, value) => time + value)
  return sum / posts.length
}

function shortest(posts: PostAnalytics[]): PostAnalytics {
  let shortest = posts[0]
  posts.forEach(it => {
    if (it.duration < shortest.duration) {
      shortest = it
    }
  })
  return shortest
}

function longest(posts: PostAnalytics[]): PostAnalytics {
  let longest = posts[0]
  posts.forEach(it => {
    if (it.duration > longest.duration) {
      longest = it
    }
  })
  return longest
}

export const Stats: React.FC<{ history: PostAnalytics[] }> = p => {
  const { history } = p
  // console.log(timings)

  const medianDuration = median(history)
  const shortestPost = shortest(history)
  const longestPost = longest(history)

  return (
    <>
      <__ row>
        <Card
          size={'small'}
          style={{ flexGrow: 1 }}
          hoverable={true}
          onClick={() => window.open(longestPost.post.url)}
        >
          <__ style={{ alignItems: 'center' }}>
            <Text>Longest</Text>
            <Text style={{ fontSize: sz.lg, fontWeight: 300, color: cl.green }}>
              {prettyTime(longestPost.duration)}
            </Text>
          </__>
        </Card>
        <Card
          size={'small'}
          style={{ flexGrow: 1 }}
          hoverable={true}
          onClick={() => window.open(shortestPost.post.url)}
        >
          <__ style={{ alignItems: 'center' }}>
            <Text>Shortest</Text>
            <Text style={{ fontSize: sz.lg, fontWeight: 300, color: cl.red }}>
              {prettyTime(shortestPost.duration)}
            </Text>
          </__>
        </Card>
        <Card size={'small'} style={{ flexGrow: 1 }}>
          <__ style={{ alignItems: 'center' }}>
            <Text>Median</Text>
            <Text style={{ fontSize: sz.lg, fontWeight: 300 }}>{prettyTime(medianDuration)}</Text>
          </__>
        </Card>
      </__>
    </>
  )
}
