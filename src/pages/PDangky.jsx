import React, { useState } from 'react'
import logo from '../assets/logol2d.png'
import { useNavigate } from 'react-router-dom'

const PDangky = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  const handleRegister = (e) => {
    e.preventDefault()  // chặn reload trang khi submit form

    if (!username || !password || !confirmPassword || !email) {
      alert('Vui lòng nhập đầy đủ thông tin')
      return
    }

    if (password !== confirmPassword) {
      alert('Mật khẩu nhập lại không khớp')
      return
    }

    alert('Tạo tài khoản thành công!')
    navigate('/') // chuyển về trang đăng nhập
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-300">
      <div className="w-[350px] p-6 bg-white rounded-xl shadow-lg flex flex-col items-center">
        
        {/* Logo */}
        <div className="w-32 h-32 rounded-full flex items-center justify-center mb-6 overflow-hidden">
          <img 
            src={logo}
            alt="Logo"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form */}
        <form onSubmit={handleRegister} className="w-full flex flex-col items-center">
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
            className="border border-gray-400 rounded px-3 py-2 w-full mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input 
            type="password"
            placeholder="Nhập lại mật khẩu"
            className="border border-gray-400 rounded px-3 py-2 w-full mb-3"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <input 
            type="email"
            placeholder="Nhập email"
            className="border border-gray-400 rounded px-3 py-2 w-full mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold py-2 w-full rounded hover:bg-blue-600 transition"
          >
            Tạo tài khoản
          </button>
        </form>

      </div>
    </div>
  )
}

export default PDangky
