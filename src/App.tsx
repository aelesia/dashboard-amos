import React from 'react'
import './App.css'
import {extend} from "@aelesia/commons-ext";
import {MainData} from "./components/pages/main/Main";
import {View} from "./components/wrapper/RNWrapper";

extend.all()

function App() {
  return (
    <View>
      <MainData />
    </View>
  )
}

export default App
