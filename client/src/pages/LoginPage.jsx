import { Link } from "react-router-dom";

export default function Login(){
    return(
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="mb-4 text-4xl text-center">Login</h1>
            <form className="max-w-md mx-auto">
                <input type="email" placeholder="yourname@email.com"></input>
                <input type="password" placeholder="Password"></input>
                <button className="primary">Login</button>
            </form>
            <div className="text-center py-2 text-gray-500">
                Don't have an account? <Link className="underline text-bn" to={'/register'}>Register Now</Link>
            </div>
            </div>

        </div>
    )
}