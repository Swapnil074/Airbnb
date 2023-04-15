import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

export default function Register(){
    const[name,setName]=useState('');
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');
    async function registerUser(ev){
        ev.preventDefault();
        try{
        await axios.post('/register',{name,email,password})
        alert('Registered Succesfully!!')
        }
        catch(e){
            alert('Registeration failed, try again later')
        }
    }

    return (
        <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
        <h1 className="mb-4 text-4xl text-center">Register</h1>
        <form className="max-w-md mx-auto" onSubmit={e=>registerUser(e)}>
            <input type="text" placeholder="Your Name" value={name} onChange={e=>setName(e.target.value)}></input>
            <input type="email" placeholder="yourname@email.com"  value={email} onChange={e=>setEmail(e.target.value)}></input>
            <input type="password" placeholder="Password"  value={password} onChange={e=>setPassword(e.target.value)}></input>
            <button className="primary">Register</button>
        </form>
        <div className="text-center py-2 text-gray-500">
            Already have an account? <Link className="underline text-bn" to={'/login'}>Login</Link>
        </div>
        </div>

    </div>
    )
}