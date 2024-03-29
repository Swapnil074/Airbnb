import React from 'react'
import Index from "./pages/IndexPage"
import { Routes,Route } from 'react-router-dom'
import Login from './pages/LoginPage'
import Layout from './Layout'
import Register from './pages/RegisterPage'
import axios from 'axios'
import { UserContextProvider } from './UserContext'
import Account from './pages/AccountPage'
import Places from './pages/PlacesPage'
import PlacesForm from './pages/PlacesFormPage'
import Place from './pages/PlacePage'
import Bookings from './pages/BookingsPage'
import Booking from './pages/BookingPage'
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
      <Route path="/account" element={<Account/>}/>
      <Route path="/account/places" element={<Places/> }/>
      <Route path="/account/places/new" element={<PlacesForm/> }/>
      <Route path="/account/places/:id" element={<PlacesForm/> }/>
      <Route path="/account/bookings/" element={<Bookings/> }/>
      <Route path="/account/bookings/:id" element={<Booking/> }/>
      <Route path="/places/:id" element={<Place/> }/>
      </Route>

    </Routes>
    </UserContextProvider>
 
  ) 
}