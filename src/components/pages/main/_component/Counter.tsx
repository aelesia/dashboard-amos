import React, { useEffect } from 'react'
import { View, Text } from 'src/components/wrapper/RNWrapper'
import { _ } from '@aelesia/commons'
import { Duration } from '@aelesia/commons/dist/src/collections/util/TimeUtil'
import { useForceUpdate } from 'src/hooks/useForceUpdate'

export const Counter: React.FC<{
  lastPostDate: Date
}> = p => {
  const { lastPostDate } = p
  const duration: Duration = _.time._duration(lastPostDate.timeSince())
  const update = useForceUpdate()
  useEffect(() => {
    const interval = setInterval(() => update(), 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <View>
      {/*<Text>{duration.years} years</Text>*/}
      <Text>{duration.days} days</Text>
      <Text>{duration.hours} hours</Text>
      <Text>{duration.mins} minutes</Text>
      <Text>{duration.secs} seconds</Text>
    </View>
  )
}
