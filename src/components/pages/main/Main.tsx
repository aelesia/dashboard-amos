import React, { useEffect, useMemo, useState } from 'react'
import { Counter } from 'src/components/pages/main/_component/Counter/Counter'
import { PostAnalytics, PostHistory } from 'src/data/types/Types.type'
import history from 'src/data/data.json'
import { _ } from '@aelesia/commons'
import { __ } from 'src/components/base/__'
import { Stats } from 'src/components/pages/main/_component/Stats'
import { Charts } from 'src/components/pages/main/_component/Charts/Charts'
import { API } from '../../../services/external/API'
import { Text } from '../../wrapper/RNWrapper'

export const MainData: React.FC = () => {
  const [posts, setPosts] = useState<PostHistory[]>()
  useEffect(() => {
    API.posts().then(d => setPosts(d))
  }, [])

  if (posts) {
    return <MainPage history={mapTimings(posts)} />
  }
  return <Text>Loading</Text>
}

function mapTimings(history: PostHistory[]): PostAnalytics[] {
  return history.slice(0, history.length - 1).map((post, i) => {
    return {
      post,
      duration: post.date.elapsed(history[i + 1].date)
    }
  })
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

export const MainPage: React.FC<{
  history: PostAnalytics[]
}> = p => {
  const longestPost = longest(p.history)
  const shortestPost = shortest(p.history)

  return (
    <__ style={{ maxWidth: 960, margin: 'auto' }}>
      <Counter lastPostDate={p.history.first().post.date} longestPost={longestPost} />
      <Stats history={p.history} longestPost={longestPost} shortestPost={shortestPost} />
      <Charts history={p.history} />
    </__>
  )
}
