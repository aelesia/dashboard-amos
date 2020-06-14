import React from 'react'
import { View } from '../../wrapper/RNWrapper'
import { Counter } from 'src/components/pages/main/_component/Counter'
import { PostHistory } from 'src/data/types/Types.type'
import history from 'src/data/data.json'
import { _ } from '@aelesia/commons'

export const MainData: React.FC = () => {
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

export const MainPage: React.FC<{
  history: PostHistory[]
}> = p => {
  const { history } = p
  return (
    <View>
      <Counter lastPostDate={history.first().date} />
    </View>
  )
}
