import React from 'react'
import { Progress } from 'antd'

function strokeColor(percent: number) {
  if (percent >= 95) {
    return {
      '30%': '#87d068',
      '70%': '#108ee9',
      '80%': '#108ee9',
      '90%': '#ff5347'
    }
  } else if (percent >= 85) {
    return {
      '35%': '#87d068',
      '70%': '#108ee9',
      '80%': '#108ee9',
      '95%': '#ff5347'
    }
  } else if (percent >= 80) {
    return {
      '35%': '#87d068',
      '70%': '#108ee9',
      '85%': '#108ee9',
      '100%': '#ff5347'
    }
  } else {
    return {
      from: '#87d068',
      to: '#108ee9'
    }
  }
}

export const ProgressBar: React.FC<{ percent: number }> = p => {
  const percent = Math.floor(p.percent)
  if (percent >= 100) {
    return (
      <Progress
        type="line"
        status="active"
        strokeColor={{
          '14%': '#5b4db7',
          '28%': '#42adc7',
          '42%': '#81d152',
          '56%': '#f5f263',
          '62%': '#f5f263',
          '76%': '#ff9d4f',
          '90%': '#ff5347'
        }}
        showInfo={false}
        percent={percent}
      />
    )
  } else {
    return (
      <Progress
        type="line"
        status="active"
        strokeColor={strokeColor(percent) as any}
        showInfo={true}
        percent={percent}
      />
    )
  }
}
