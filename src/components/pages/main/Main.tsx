import React, { useMemo } from 'react'
import { View } from 'src/components/wrapper/RNWrapper'
import { Counter } from 'src/components/pages/main/_component/Counter'
import { PostAnalytics, PostHistory } from 'src/data/types/Types.type'
import history from 'src/data/data.json'
import { _ } from '@aelesia/commons'
import { __ } from 'src/components/base/__'
import { Stats } from 'src/components/pages/main/_component/Stats'
import { MyChart } from 'src/components/pages/main/_component/Charts/_component/MyChart'
import { RoseChart } from 'src/components/pages/main/_component/Charts/_component/RoseChart'
import { Charts } from 'src/components/pages/main/_component/Charts/Charts'

export const MainData: React.FC = () => {
  console.log('mainpage')
  return (
    <MainPage
      history={history.map<PostHistory>(it => {
        return {
          title: it.title,
          parent_id: it.parent_id,
          thread_id: it.thread_id,
          url: it.url,
          kind: it.kind,
          body: it.body,
          author: it.author,
          date: _.date.parse(it.date),
          id: it.id
        }
      })}
    />
  )
}

function mapTimings(history: PostHistory[]): PostAnalytics[] {
  return history.slice(0, history.length - 1).map((post, i) => {
    return {
      post,
      duration: post.date.elapsed(history[i + 1].date)
    }
  })
}

export const MainPage: React.FC<{
  history: PostHistory[]
}> = p => {
  const { history } = p
  const timings = useMemo(() => mapTimings(history), [history])
  return (
    <__ style={{ maxWidth: 960, margin: 'auto' }}>
      <Counter lastPostDate={history.first().date} />
      <Stats history={timings} />
      <Charts history={timings} />
    </__>
  )
}
