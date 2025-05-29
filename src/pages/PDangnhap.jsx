import React, { useState } from 'react'
import logo from '../assets/logol2d.png'
import { useNavigate } from 'react-router-dom'

const PDangnhap = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault() // chặn reload

    if (!username || !password) {
      alert('Vui lòng nhập đầy đủ tài khoản và mật khẩu')
      return
    }

    // Test tạm
    if (username === 'admin' && password === '123456') {
      alert('Đăng nhập thành công!')
      navigate('/tongquan')
    } else {
      alert('Sai tài khoản hoặc mật khẩu')
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-300">
      <div className="w-[350px] h-[500px] p-6 bg-white rounded-xl shadow-lg flex flex-col items-center">
        
        {/* Logo */}
        <div className="w-32 h-32 rounded-full flex items-center justify-center mb-6 overflow-hidden">
          <img 
            src={logo}
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="w-full flex flex-col items-center">
          <input 
            type="text"
            placeholder="Tài khoản"
            className="border border-gray-400 rounded px-3 py-2 w-full mb-3"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="password"
            placeholder="Mật khẩu"
            className="border border-gray-400 rounded px-3 py-2 w-full mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 w-full rounded hover:bg-blue-600 transition mt-5"
          >
            Đăng nhập
          </button>
        </form>

        {/* Các nút khác */}
        <div className="flex justify-between items-center w-full mt-20">
          <button 
            className="bg-gray-500 text-white px-3 py-1 rounded text-sm cursor-pointer"
            onClick={() => navigate('/dangky')}
          >
            Tạo tài khoản
          </button>
          <a href="#" className="text-sm text-black">Quên mật khẩu ?</a>
        </div>

      </div>
    </div>
  )
}

export default PDangnhap
