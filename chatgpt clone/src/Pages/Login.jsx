import { useState } from 'react'
import axios from 'axios'
import {useNavigate } from 'react-router-dom'

export default function Login() {
	const navigate = useNavigate()
	const [email,setemail] = useState('')
	const [password, setPassword] = useState('')
	const [showPassword, setShowPassword] = useState(false)

	const handleSubmit = async(e) => {
		e.preventDefault()
		try {
			const res = await axios.post("http://localhost:3000/user/loginuser",{
			email,password
		},{withCredentials:true})
		navigate("/home")
		} catch (error) {
			console.log(error)
		}
		
	}

	return (
		<div className="h-screen bg-[#0b0f1a] flex items-center justify-center px-4">
			<div className="w-full max-w-sm">
				<div className="relative">
					<div className="bg-[#0c0f1a] border border-black/30 rounded-2xl px-6 py-8 shadow-[0_20px_60px_rgba(2,6,23,0.9)]">
						<div className="flex flex-col items-center">
							<div className="-mt-12 mb-3 w-14 h-14 rounded-full bg-[#0b0f3f] flex items-center justify-center shadow-md">
								<svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-[#7c3aed]" fill="currentColor" viewBox="0 0 24 24">
									<path d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5zm0 2c-4 0-8 2-8 4v2h16v-2c0-2-4-4-8-4z" />
								</svg>
							</div>
							<h2 className="text-xl font-semibold text-white">Welcome Back</h2>
							<p className="text-sm text-slate-400 mt-1 mb-6">Sign in to continue to your account.</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<input
									value={email}
									onChange={(e) => setemail(e.target.value)}
									placeholder="Your Email id"
									className="w-full bg-transparent border border-white/6 rounded px-3 py-2 text-slate-200 placeholder:text-slate-500 outline-none focus:border-[#3b82f6]"
								/>
							</div>

							<div className="relative">
							
								<input
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Password"
									className="w-full bg-transparent border border-white/6 rounded px-3 py-2 text-slate-200 placeholder:text-slate-500 outline-none focus:border-[#3b82f6]"
								/>
								<button type="button" onClick={() => setShowPassword((s) => !s)} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
									{showPassword ? 'Hide' : 'Show'}
								</button>
							</div>

							<button type="submit" className="w-full bg-[#2b44ff] hover:bg-[#2a3ef7] text-white rounded-md py-2 font-medium">Login</button>
						</form>

						<div className="mt-4 text-center text-sm">
							<a href="/register" className="text-slate-400 hover:text-slate-200">Don't have an account? <span className="text-[#2b44ff]">Sign up</span></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

