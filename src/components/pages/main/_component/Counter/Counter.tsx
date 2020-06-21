import React, { useEffect, useState } from 'react'
import { Text, View } from 'src/components/wrapper/RNWrapper'
import { _ } from '@aelesia/commons'
import { Duration } from '@aelesia/commons/dist/src/collections/util/TimeUtil'
import { useForceUpdate } from 'src/hooks/useForceUpdate'
import { __ } from 'src/components/base/__'
import { sp, sz } from 'src/style/Style'
import { Card, Modal } from 'antd'
import { PostAnalytics } from 'src/data/types/Types.type'
import { ProgressBar } from 'src/components/pages/main/_component/Counter/_component/ProgressBar'

const Box: React.FC<{
  number: string | number
  text: string
}> = p => {
  const { number, text } = p

  return (
    <View style={{ alignItems: 'center', marginLeft: sp.sm, marginRight: sp.sm }}>
      <Text style={{ fontSize: sz.lg, fontWeight: 400 }}>{number}</Text>
      <Text style={{ textTransform: 'uppercase', fontWeight: 100 }}>{text}</Text>
    </View>
  )
}

export const Counter: React.FC<{
  lastPostDate: Date
  longestPost: PostAnalytics
}> = p => {
  const { lastPostDate } = p
  const duration: Duration = _.time._duration(lastPostDate.timeSince())
  const [percent] = useState((lastPostDate.timeSince() / p.longestPost.duration) * 100)
  const update = useForceUpdate()

  useEffect(() => {
    const interval = setInterval(() => update(), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Card style={{ padding: 0, margin: sp.xxs }} hoverable>
      <__ row style={{ justifyContent: 'center' }}>
        <Box number={duration.days} text={'days'} />
        <Box number={duration.hours} text={'hours'} />
        <Box number={duration.mins} text={'minutes'} />
        <Box number={duration.secs} text={'seconds'} />
      </__>
      <ProgressBar percent={percent} />
    </Card>
  )
}
