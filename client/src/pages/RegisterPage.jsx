import React from "react";
import { Link } from "react-router-dom";

export default function Register(){
    return (
        <div className="mt-4 grow flex items-center justify-around">
        <div className="mb-64">
        <h1 className="mb-4 text-4xl text-center">Register</h1>
        <form className="max-w-md mx-auto">
            <input type="text" placeholder="Your Name"></input>
            <input type="email" placeholder="yourname@email.com"></input>
            <input type="password" placeholder="Password"></input>
            <button className="primary">Register</button>
        </form>
        <div className="text-center py-2 text-gray-500">
            Already have an account? <Link className="underline text-bn" to={'/login'}>Login</Link>
        </div>
        </div>

    </div>
    )
}