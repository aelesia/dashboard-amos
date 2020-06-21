import React from 'react'
import './App.css'
import { extend } from '@aelesia/commons-ext'
import { MainData } from './components/pages/main/Main'
import { View } from 'src/components/wrapper/RNWrapper'
import 'antd/dist/antd.css'
import { BrowserRouter } from 'react-router-dom'
import { MyModal } from 'src/app/Modal/MyModal'
import Modal from 'src/app/Modal/Modal'

extend.all()

function App() {
  return (
    <BrowserRouter>
      <MyModal ref={ref => Modal.setModal(ref)} />
      <MainData />
    </BrowserRouter>
  )
}

export default App
