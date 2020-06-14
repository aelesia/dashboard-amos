import React from 'react'
import logo from './logo.svg'
import './App.css'
import {Cfg} from "./app/Cfg";
import {extend} from "@aelesia/commons-ext";
import {_} from "@aelesia/commons";
import {Home} from "./components/Home";
import {View} from "./components/wrapper/RNWrapper";

extend.all()

function App() {
  return (
    <View>
      <Home />
    </View>
  )
}

export default App
