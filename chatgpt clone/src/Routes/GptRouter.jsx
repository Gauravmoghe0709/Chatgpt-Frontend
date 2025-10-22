import { Routes, Route } from 'react-router-dom'
import Home from '../components/Home'
import Login from '../Pages/Login'
import Register from '../Pages/Register'

const GptRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/Home" element={<Home/>} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default GptRouter
