import React, { ReactElement } from 'react'
import { UninitializedErr } from '@aelesia/commons'

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

  render(element: () => ReactElement) {
    if (this.modal == null) {
      throw new UninitializedErr(
        'Modal not initialized. Please render <Modal> in the top level component and call setModal(ref)'
      )
    }
    // if (typeof element === 'function') {
    this.modal.render(element())
    // } else {
    //   this.modal.render(element)
    // }
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
