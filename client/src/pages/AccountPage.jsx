import axios from "axios"
import { useContext, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import AccountNav from "../AccountNavigation"
import { UserContext } from "../UserContext"
import Places from "./PlacesPage"

export default function Account(){
    const [redirect, setRedirect]=useState(null)
    const {user,ready,setUser}=useContext(UserContext)
    let {subpage}=useParams() 
    if(subpage===undefined) subpage='profile'

    async function logOut(){
        await axios.post('/logout')
        setRedirect('/')
        setUser(null)

    }

    if(!ready){
        return 'Loading...'
    }
   if(ready && !user && !redirect){
    return <Navigate to={'/login'}/>
   }
  


   if(redirect) {
    return <Navigate to={redirect}/>
   }
    return (
      <div>
        <AccountNav/>
        {subpage === "profile" && (
          <div className="text-center max-w-lg mx-auto">
            LoggedIn as {user.name} ({user.email}) <br />
            <button className="primary max-w-sm mt-2" onClick={logOut}>
              logout
            </button>
          </div>
        )}
        {subpage === "places" && (
          <div>
            <Places />
          </div>
        )}
      </div>
    );
}