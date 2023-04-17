import React from 'react'
import Index from "./pages/IndexPage"
import { Routes,Route } from 'react-router-dom'
import Login from './pages/LoginPage'
import Layout from './Layout'
import Register from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import Account from './pages/AccountPage'
axios.defaults.baseURL="http://localhost:4000"
axios.defaults.withCredentials=true;

export default function App() {
  
  return (
    <UserContextProvider>

    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Index/>} />
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/account/:subpage?" element={<Account/>}/>
      <Route path="/account/:subpage/:action" element={<Account/>}/>
      </Route>

    </Routes>
    </UserContextProvider>
 
  ) 
}