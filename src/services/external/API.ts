import Http from 'httyp'
import { Cfg } from '../../app/Cfg'
import { PostHistory } from '../../data/types/Types.type'
import { _ } from '@aelesia/commons'

const http = Http.url(Cfg.BACKEND_URL)

type ResponsePosts = {
  kind: 't1' | 't3'
  id: string
  url: string
  author: string
  thread_id: string
  parent_id?: string
  title: string
  body: string
  date: string
}[]
async function posts(): Promise<PostHistory[]> {
  const posts = (await http.path('records').get<ResponsePosts>()).data

  return posts.map<PostHistory>(it => {
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
  })
}

export const API = { posts }
