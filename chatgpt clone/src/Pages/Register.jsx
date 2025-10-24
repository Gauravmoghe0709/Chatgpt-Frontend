import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export default function Register() {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
      const res = await axios.post("https://chatgpt-backend-jr20.onrender.com/user/newuser",{
        username,email,password,confirm},{withCredentials:true})
        console.log(res) 
        navigate("/")
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-screen bg-[#05060a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="bg-[#0c1116] rounded-2xl p-6 shadow-[0_30px_60px_rgba(2,6,23,0.9)] border border-black/30">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Create an Account</h2>
            <p className="text-sm text-slate-400 mt-1">Join our community and start your journey.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full bg-transparent border border-white/6 rounded px-3 py-2 text-slate-200 placeholder:text-slate-500 focus:border-[#1e90ff] outline-none"
            />

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              type="email"
              className="w-full bg-transparent border border-white/6 rounded px-3 py-2 text-slate-200 placeholder:text-slate-500 focus:border-[#1e90ff] outline-none"
            />

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full bg-transparent border border-white/6 rounded px-3 py-2 text-slate-200 placeholder:text-slate-500 focus:border-[#1e90ff] outline-none"
              />
              <button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Confirm Password"
                className="w-full bg-transparent border border-white/6 rounded px-3 py-2 text-slate-200 placeholder:text-slate-500 focus:border-[#1e90ff] outline-none"
              />
              <button type="button" onClick={() => setShowConfirm((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                {showConfirm ? 'Hide' : 'Show'}
              </button>
            </div>

            <button type="submit" className="w-full bg-[#1890ff] hover:bg-[#1a7df0] text-white rounded-md py-2 font-medium">Register</button>
          </form>

          <div className="mt-4 text-center text-sm text-slate-400">
            Already have an account? <a href="/login" className="text-[#1890ff]">Sign in</a>
          </div>
        </div>
      </div>
    </div>
  )
}
