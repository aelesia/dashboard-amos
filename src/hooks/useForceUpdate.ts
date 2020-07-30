import React, { useCallback } from 'react'

export function useForceUpdate(): () => void {
  const [, updateState] = React.useState()
  return useCallback(() => updateState({}), [])
}
