import React, { useContext } from "react";
import { useState } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";

export default function Login(){
    const [email, setEmail]=useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser}=useContext(UserContext)
    async function handleLoginSubmit(e){
        e.preventDefault();
        try {
            const response=await axios.post('/login',{email,password},{withCredentials:true})
            alert('Login Succesfull');
            setUser(response.data)
            setRedirect(true);
        } catch (e) {
            alert('Login Failed');
        }
    }
    if(redirect){
        return(
            <Navigate to={'/'}/>
        )
    }
    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="mb-4 text-4xl text-center">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={e=>handleLoginSubmit(e)}>
            <input type="email" placeholder="yourname@email.com"  value={email} onChange={e=>setEmail(e.target.value)}></input>
            <input type="password" placeholder="Password"  value={password} onChange={e=>setPassword(e.target.value)}></input>
            <button className="primary">Login</button>
            </form>
            <div className="text-center py-2 text-gray-500">
                Don't have an account? <Link className="underline text-bn" to={'/register'}>Register Now</Link>
            </div>
            </div>

        </div>
    )
}