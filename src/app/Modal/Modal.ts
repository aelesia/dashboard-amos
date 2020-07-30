import { ReactElement } from 'react'
import { v4 as uuid } from 'uuid'
import { UninitializedErr } from '@aelesia/commons/dist/src/error/Error'

/** SAMPLE
 const App: React.FC = () => {
    return (
      <>
        <MyModal ref={ref => { Modal.setModal(ref)} } />
        <SomeComponent />
      </>
    )
  }
 **/

class Modal {
  modal: any = undefined as any

  setModal(modal: any) {
    this.modal = modal
  }

  render<T = undefined>(element: ReactElement | (() => ReactElement)): Promise<T> {
    if (this.modal == null) {
      throw new UninitializedErr(
        'Modal not initialized. Please render <Modal> in the top level component and call setModal(ref)'
      )
    }
    if (typeof element === 'function') {
      return this.modal.render(element(), uuid())
    } else {
      return this.modal.render(element, uuid())
    }
  }

  // close() {
  //   if (this.modal == null) {
  //     throw Error(
  //       'Modal not initialized. Please render <Modal> in the top level component and call setModal(ref)'
  //     )
  //   }
  //   this.modal.close()
  // }
}
export default new Modal()
