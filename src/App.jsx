import Header from './components/Header'
import Ptongquan from './pages/Ptongquan'
import PLoaicongviec from './pages/PLoaicongviec'
import { Routes, Route } from 'react-router-dom'
import PDangnhap from './pages/PDangnhap'
import PDangky from './pages/PDangky'


function App() {
  return (
      <Routes>
        <Route path='/' element={<PDangnhap />} />
        <Route path='/tongquan' element={<Ptongquan />} />
        <Route path='/loaicongviec' element={<PLoaicongviec />}/>   
        <Route path='/dangky' element={<PDangky />}/>    
      </Routes>
  )
}

export default App
