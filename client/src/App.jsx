import React from 'react'
import Index from "./pages/IndexPage"
import { Routes,Route } from 'react-router-dom'
import Login from './pages/LoginPage'
import Layout from './Layout'
import Register from './pages/RegisterPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Index/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      </Route>

    </Routes>
  ) 
}