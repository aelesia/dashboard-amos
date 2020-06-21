import React, { forwardRef, ReactElement, useImperativeHandle, useState } from 'react'
import { Modal } from 'antd'
import { Text } from 'src/components/wrapper/RNWrapper'

export const MyModal = forwardRef((props, ref) => {
  const [visibility, setVisibility] = useState<boolean>(false)
  // const [reactElement, setReactElement] = useState<ReactElement>(<Text>{'{modal}'}</Text>)

  useImperativeHandle(ref, () => ({
    // /**
    //  * @deprecated
    //  */
    // close() {
    //   if (!visibility) {
    //     console.warn('[Modal]: Modal close was called before it was rendered')
    //   }
    //   setVisibility(false)
    // },
    async render<T>(element: ReactElement): Promise<T> {
      if (visibility) {
        console.warn('[Modal]: Modal render was called before it was closed')
      }
      return new Promise((res, rej) => {
        const ok = (result: T | undefined) => {
          setVisibility(false)
          res(result)
        }
        const cancel = () => {
          setVisibility(false)
          rej()
        }
        const props = { ...element.props, ...{ modal: { ok, cancel } } }
        // setReactElement(React.createElement(element.type, props))
        setVisibility(true)
      })
    }
  }))

  // BUG: Modal flashes sometimes
  return (
    <Modal
      visible={visibility}
      onCancel={() => setVisibility(false)}
      cancelButtonProps={{ hidden: true }}
      okButtonProps={{ hidden: true }}
      footer={null}
    >
      <Text>Hehe</Text>
    </Modal>
  )
})
