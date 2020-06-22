import React from 'react'
import { PostAnalytics } from 'src/data/types/Types.type'
import { Timeline } from 'antd'
import { prettyTime } from 'src/utils/Format'
import { Text } from 'src/components/wrapper/RNWrapper'
import { __ } from 'src/components/base/__'
import { cl, sz, wt } from 'src/style/Style'

export const LongestRecord: React.FC<{ history: PostAnalytics[] }> = p => {
  const sorted = p.history.sort((a, b) => b.duration - a.duration).slice(0, 5)

  return (
    <Timeline mode={'left'}>
      {sorted.map(it => (
        <Timeline.Item
          color="green"
          key={it.post.id}
          label={
            <__ row style={{ alignItems: 'center' }}>
              <Text style={{ color: cl.grey3, fontSize: sz.xs }}>
                {it.post.date._f('DD MMMM YYYY')}
              </Text>
              <Text style={{ fontWeight: wt._300, fontSize: sz.md, marginLeft: 'auto' }}>
                {prettyTime(it.duration)}
              </Text>
            </__>
          }
        >
          <a href={it.post.url}>
            <Text>{it.post.title}</Text>
          </a>
        </Timeline.Item>
      ))}
    </Timeline>
  )
}
