import React from 'react'
import './App.css'
import { extend } from '@aelesia/commons-ext'
import { MainData } from './components/pages/main/Main'
import { View } from 'src/components/wrapper/RNWrapper'
import 'antd/dist/antd.css'
import { BrowserRouter } from 'react-router-dom'

extend.all()

function App() {
  return (
    <BrowserRouter>
      <MainData />
    </BrowserRouter>
  )
}

export default App
