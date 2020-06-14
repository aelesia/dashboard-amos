import React from 'react'
import { View } from './wrapper/RNWrapper'

export const Counter: React.FC<{
  lastPostDate: Date
}> = p => {
  const msElapsed = (new Date()).getTime() - p.lastPostDate.getTime()
  return <View/>
}

export const Home: React.FC = () => {
  return (<View><span>Hello</span></View>)
}
