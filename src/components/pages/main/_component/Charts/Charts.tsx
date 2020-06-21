import React, { ReactElement } from 'react'
import { Carousel } from 'antd'
import { PostAnalytics } from 'src/data/types/Types.type'
import { MyChart } from 'src/components/pages/main/_component/Charts/_component/MyChart'
import { RoseChart } from 'src/components/pages/main/_component/Charts/_component/RoseChart'
import { Text } from 'src/components/wrapper/RNWrapper'
import Tabs from 'antd/es/tabs'
import { __ } from 'src/components/base/__'
import { sp } from 'src/style/Style'
import { CalendarChart } from 'src/components/pages/main/_component/Charts/_component/CalendarChart'
const { TabPane } = Tabs

export const Charts: React.FC<{ history: PostAnalytics[] }> = p => {
  return (
    <__ style={{ padding: sp.sm }}>
      <Tabs defaultActiveKey="1">
        <TabPane tab="Time Between Posts" key="1">
          <MyChart history={p.history} />
        </TabPane>
        <TabPane tab="Monthly Breakdown" key="2">
          <RoseChart history={p.history} />
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          <CalendarChart history={p.history} />
        </TabPane>
      </Tabs>
    </__>
  )
}
