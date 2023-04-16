import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../UserContext"

export default function Account(){
    const {user,ready}=useContext(UserContext)
    if(!ready){
        return 'Loading...'
    }
   if(ready && !user){
    return <Navigate to={'/login'}/>
   } 
    return(
        <div>
            Account Page {user?.name}
        </div>
    )
}