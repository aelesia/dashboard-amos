import React, { forwardRef, ReactElement, useImperativeHandle, useState } from 'react'
import { Modal } from 'antd'
import { Text } from 'src/components/wrapper/RNWrapper'

type ModalInfo = {
  visibility: boolean
  reactElement: ReactElement
  uuid: string
}

type ModalInfo2 = Record<
  string,
  {
    visibility: boolean
    reactElement: ReactElement
  }
>

export const MyModal = forwardRef((props, ref) => {
  const [visibility, setVisibility] = useState<boolean>(false)
  const [reactElement, setReactElement] = useState<ReactElement>(<Text>{'{modal}'}</Text>)
  const [modalInfoList, setModalInfoList] = useState<ModalInfo[]>([])

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
    async render<T>(element: ReactElement, uuid: string): Promise<T> {
      // if (visibility) {
      //   console.warn('[Modal]: Modal render was called before it was closed')
      // }

      return new Promise((res, rej) => {
        const ok = (result: T | undefined) => {
          // setVisibility(false)
          res(result)
        }
        const cancel = () => {
          // setVisibility(false)
          rej()
        }
        const props = { ...element.props, ...{ modal: { ok, cancel } } }
        const modalInfo = {
          visibility: true,
          reactElement: React.createElement(element.type, props),
          uuid: uuid
        }
        setModalInfoList(prev => [...prev, modalInfo])
      })
    }
  }))

  // BUG: Modal flashes sometimes
  return (
    <>
      {modalInfoList.map(it => (
        <Modal
          key={it.uuid}
          visible={it.visibility}
          onCancel={() => setModalInfoList(prev => prev.filter(prevIt => prevIt.uuid !== it.uuid))}
          cancelButtonProps={{ hidden: true }}
          okButtonProps={{ hidden: true }}
          footer={null}
        >
          {it.reactElement}
        </Modal>
      ))}
    </>
  )
})
