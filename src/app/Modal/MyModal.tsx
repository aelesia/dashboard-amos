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
    res: Function
    rej: Function
  }
>

export const MyModal = forwardRef((props, ref) => {
  const [modalInfoList, setModalInfoList] = useState<ModalInfo2>({})

  useImperativeHandle(ref, () => ({
    async render<T>(element: ReactElement, uuid: string): Promise<T> {
      return new Promise((res, rej) => {
        const ok = (result: T | undefined) => {
          res(result)
        }
        const cancel = () => {
          rej()
        }
        const props = { ...element.props, ...{ modal: { ok, cancel } } }
        const modalInfo = {
          [uuid]: {
            reactElement: React.createElement(element.type, props),
            visibility: true,
            res,
            rej
          }
        }
        setModalInfoList(prev => Object.assign(modalInfo, prev))
      })
    }
  }))

  // BUG: Modal flashes sometimes
  return (
    <>
      {Object.keys(modalInfoList).map(uuid => (
        <Modal
          key={uuid}
          visible={modalInfoList[uuid].visibility}
          onCancel={() => {
            setModalInfoList(prev => {
              prev[uuid].visibility = false
              return { ...prev }
            })
            modalInfoList[uuid].res()
          }}
          cancelButtonProps={{ hidden: true }}
          okButtonProps={{ hidden: true }}
          footer={null}
        >
          {modalInfoList[uuid].reactElement}
        </Modal>
      ))}
    </>
  )
})
