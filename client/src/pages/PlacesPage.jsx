import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import PerkLabels from "../PerksLabel";

export default function Places(){
    const {action}=useParams()
    const[title,setTitle]=useState('');
    const[address,setAddress]=useState('');
    const[addedPhotos,setAddedPhotos]=useState([]);
    const[photoLink,setPhotoLink]=useState('');
    const[description,setDescription]=useState();
    const[perks,setPerks]=useState([]);
    const[extraInfo,setExtraInfo]=useState('');
    const[checkIn,setCheckIn]=useState('');
    const[checkOut,setcheckOut]=useState('');
    const[maxGuests,setMaxGuests]=useState(2);

    function inputHeader(header){
        return(
        <h2 className="text-xl mt-4 ">{header}</h2>
        )
    }
    function inputDescription(text){
        return(
        <p className="text-gray-500 text-sm">{text}</p>
        )
    }
    function preInput(header,text){
        return(
        <>
            {inputHeader(header)}
            {inputDescription(text)}
        </>
        )
    }
    async function addPhotoByLink(e){
        e.preventDefault()
        const {data}=await axios.post('/upload-by-link',{link:photoLink})
        console.log(data)
        setAddedPhotos(prev=>{
            return[...prev,data]
        })
        setPhotoLink('')
    }
    function uploadPhoto(e){
        e.preventDefault()
        const files=e.target.files
        const data=new FormData()
        for(let i=0; i<files.length; i++){
            data.append('photos',files[i])
        }
        axios.post('/upload',data,{
            headers:{'Content-type':'multipart/form-data'}
        }).then((res)=>{
            const {data:filenames}=res
            setAddedPhotos(prev=>{
                return[...prev,...filenames]
            })
            console.log(filenames)
        })
    }
    return (
        <div>
            {action!=='new' && ( 
            <div className="text-center">
                <Link className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full" to={'/account/places/new'}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                Add new Place 
                </Link>
            </div>
)}
            {action==='new' && (
                <div>
                    <form>
                    {preInput('Title', 'Title/heading for your place')}
                        <input type='text' placeholder="title, for example: My apartment" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                        <h2 className="text-xl mt-4">Address</h2>
                    <p className="text-gray-500 text-sm">Address to this place.</p>
                        
                        <input type='text' placeholder="address"  value={address} onChange={(e)=>setAddress(e.target.value)}/>
                    {preInput('Photos', 'More=Better')}
                    <div className="flex gap-2">
                        <input type='text' placeholder="Add using a link..."  value={photoLink} onChange={(e)=>setPhotoLink(e.target.value)}/>
                        <button onClick={(e)=>addPhotoByLink(e)} className="bg-gray-200 grow rounded-2xl px-4">Add &nbsp; photo</button>
                    </div>
                    <div className="mt-2 grid h-32 gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                    {addedPhotos.length>0 && addedPhotos.map(link=>(
                        <div className="h-32 flex">
                            <img className="rounded-2xl w-full object-coverz" src={"http://localhost:4000/uploads/"+link} alt/>
                        </div>
                    ))}
                    <label className="cursor-pointer flex items-center gap-2 justify-center border bg-transparent rounded-2xl p-2 text-gray-600" >
                    <input type={'file'} multiple className="hidden" onChange={(e)=>uploadPhoto(e)}/>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                        </svg> Upload
                    </label>
                    </div>
                    {preInput('Description', 'Description of your place.')}
                        <textarea  value={description} onChange={(e)=>setDescription(e.target.value)}/>
                    {preInput('Perks','Select all the perks of your place')}
                        <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                            <PerkLabels selected={perks} onChange={setPerks}/>
                        </div> 
                        {preInput('ExtraInfo','Any extra info you want to add')}
                        <textarea  value={extraInfo} onChange={(e)=>setExtraInfo(e.target.value)}/> 
                        {preInput('Check in&out times','Add check in and check out time')}
                        <div className="grid gap-2 sm:grid-cols-3">
                        <div>
                            <h3 className="mt-2 -mb-1 ">Check in time</h3>
                            <input type='text' placeholder="14:00"  value={checkIn} onChange={(e)=>setCheckIn(e.target.value)}/>
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1 ">Check out time</h3>
                            <input type='text' placeholder="12:00"  value={checkOut} onChange={(e)=>setcheckOut(e.target.value)}/>
                        </div>
                        <div>
                            <h3 className="mt-2 -mb-1 ">Max number of guests</h3>
                             <input type='text' placeholder="2"  value={maxGuests} onChange={(e)=>setMaxGuests(e.target.value)}/>
                        </div>
                        </div>
                            <button className="primary my-4">Save</button>
                    </form>
                </div>
)}
        </div>
    )
}