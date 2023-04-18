import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import BookingForm from "../BookingForm.jsx"

export default function Place(){
    const [place,setPlace]=useState({})
    const {id}=useParams()
    const [popup,setPopup]=useState(false)

    useEffect(()=>{
        axios.get('/places/'+id).then((res=>setPlace(res.data)))

    },[id])


    if(!place)
    return "Loading..."

    if(popup){
        return (
          <div className="absolute inset-0 bg-black min-h-screen">
            <div className="bg-black p-8 grid gap-4 ">
              <div className="">
                <h2 className="text-3xl text-white mr-48 ">Photos of {place.title}</h2>
                <button
                  onClick={() => setPopup(false)}
                  className="flex shadow-md shadow-black-200 bg-gray-100 py-2 px-4 gap-1 rounded-2xl fixed right-12 top-6"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="w-6 h-6"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Close
                </button>
              </div>
              {place?.photos?.length > 0 &&
                place.photos.map((photo) => (
                  <div className="grid">
                    <img src={"http://localhost:4000/uploads/" + photo} />
                  </div>
                ))}
            </div>
          </div>
        );
    }

    return (
      <>
        <div className="mt-4 pt-8 bg-gray-100 -m-8 px-8">
          <h1 className="text-3xl">{place.title}</h1>
          <a
            href={"https://maps.google.com/?q=" + place.address}
            target="_blank"
            className="flex my-3     gap-1 font-semibold underline"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
              />
            </svg>

            {place.address}
          </a>
          <div className="relative">
            <div className="grid gap-2 grid-cols-[2fr_1fr] rounded-3xl overflow-hidden">
              <div className="">
                <img
                  onClick={() => setPopup(true)}
                  className="aspect-square object-cover cursor-pointer"
                  src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                />
              </div>
              <div className="grid">
                {place.photos?.[1] && (
                  <img
                    onClick={() => setPopup(true)}
                    className="aspect-square object-cover cursor-pointer"
                    src={"http://localhost:4000/uploads/" + place.photos[1]}
                  />
                )}
                <div className="overflow-hidden">
                  {place.photos?.[2] && (
                    <img
                      onClick={() => setPopup(true)}
                      className="aspect-square object-cover cursor-pointer relative"
                      src={"http://localhost:4000/uploads/" + place.photos?.[2]}
                    />
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={() => setPopup(true)}
              className="absolute bottom-2 flex right-2 py-2 px-4 gap-1 bg-white rounded-2xl shadow-md shadow-gray-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6"
              >
                <path
                  fill-rule="evenodd"
                  d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                  clip-rule="evenodd"
                />
              </svg>
              More Photos
            </button>
          </div>

          <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
            <div className="">
              <div className="mb-2">
                <h2 className="text-2xl font-semibold">Description</h2>
                {place.description}
              </div>
              Check-in: {place.checkIn} <br />
              Check-out: {place.checkOut} <br />
              Max number of Guests: {place.maxGuest} <br />
            </div>

            <div className="">
              <BookingForm place={place} />
            </div>
          </div>
          <div className="bg-white -mx-8 px-8 py-8">
            <div className="text-sm mt-2 mb-4 text-gray-700 leading-5">
              <h2 className="text-2xl font-semibold">Extra Info</h2>
              {place.extraInfo}
            </div>
          </div>
        </div>
      </>
    );
}