import { useState } from 'react'
import Header from './components/Header'
import Ptongquan from './pages/Ptongquan'
import PLoaicongviec from './pages/PLoaicongviec'
import { Routes, Route } from 'react-router-dom'

import './App.css'

function App() {
  return (
      <Routes>
        <Route path='/' element={<Ptongquan />} />
        <Route path='/loaicongviec' element={<PLoaicongviec />}/>    
      </Routes>
  )
}

export default App
