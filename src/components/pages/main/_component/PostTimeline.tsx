import React from 'react'
import { PostAnalytics } from 'src/data/types/Types.type'
import { Tag, Timeline } from 'antd'
import { prettyTime } from 'src/utils/Format'
import { __ } from 'src/components/base/__'
import { cl, sz, wt } from 'src/style/Style'
import Paragraph from 'antd/es/typography/Paragraph'
import { Link } from 'react-router-dom'
import { Text } from 'src/components/wrapper/RNWrapper'

export const ShortDate: React.FC<{
  post: PostAnalytics
}> = p => {
  const startDate = p.post.post.date.minus(p.post.duration)
  const endDate = p.post.post.date
  return (
    <__ style={{ marginLeft: 'auto' }}>
      <Text style={css.dateText}>{startDate._f('DD MMMM YYYY')}</Text>
      <Text style={css.dateText}>
        {startDate._f('HH:mm')} - {endDate._f('HH:mm')}
      </Text>
    </__>
  )
}

const LongDate: React.FC<{
  post: PostAnalytics
}> = p => {
  const startDate = p.post.post.date.minus(p.post.duration)
  const endDate = p.post.post.date
  return (
    <Text style={[css.dateText, { marginLeft: 'auto' }]}>
      {startDate._f('DD MMM')} - {endDate._f('DD MMM YYYY')}
    </Text>
  )
}

export const PostTimeline: React.FC<{
  postList: PostAnalytics[]
  color: 'green' | 'red'
}> = p => {
  return (
    <Timeline mode={'left'}>
      {p.postList.map(it => (
        <Timeline.Item color={p.color} key={it.post.id}>
          <__ row style={{ alignItems: 'center' }}>
            <Text style={{ fontWeight: wt._300, fontSize: sz.lg }}>{prettyTime(it.duration)}</Text>
            {p.color === 'green' ? <LongDate post={it} /> : <ShortDate post={it} />}
          </__>
          <a href={it.post.url}>
            <Paragraph style={{ color: cl.link, fontSize: sz.xs }} ellipsis={{ rows: 2 }}>
              {it.post.title}
            </Paragraph>
          </a>
        </Timeline.Item>
      ))}
    </Timeline>
  )
}

const css = {
  dateText: {
    fontFamily: 'Roboto Mono',
    marginLeft: 'auto',
    fontWeight: wt._300,
    color: cl.grey3
  }
}
