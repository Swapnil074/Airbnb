import axios from "axios";
import {differenceInCalendarDays} from "date-fns";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function BookingForm({place}){
  const [checkIn, setCheckIn] = useState("");
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [redirect, setRedirect] = useState("");
  const [guests, setGuests] = useState(1);
  let price = 0;
  let cost = 0;
  if (place.price) {
    const priceNum = place.price.split(" ");
    price = Number(priceNum[0].split("$")[1]);
  }
  let NumberofDays = 0;
  if (checkIn && checkOut)
    NumberofDays = differenceInCalendarDays(
      new Date(checkOut),
      new Date(checkIn)
    ),cost=price*NumberofDays;
    async function bookPlace(){
        const res= await axios.post('/booking',{place:place._id, checkIn,checkOut,mobile,name,guests,cost})
        console.log(res.data)
        const bookingId=res.data._id
        setRedirect(`/account/bookings/${bookingId}`);
    }
    if(redirect){
        return(
            <Navigate to={redirect}/>
        )
    }
  return (
    <>
      <div className="bg-white shadow rounded-2xl p-4 grid gap-2">
        <div className="text-2xl text-center">Price: {place.price}</div>
        <div className="border rounded-2xl mt-4">
          <div className="flex">
            <div className="px-3 py-4 ">
              <label>Check in: </label>
              <input
                type="date"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div className="px-3 py-4 border-l">
              <label>Check out: </label>
              <input
                type="date"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
          </div>
          <div className="px-3 py-4 border-t">
            <label>Guests: </label>
            <input
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
            />
          </div>
          <div className="px-3 pt-4 border-t">
            <label>Name: </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="px-3 pb-4">
            <label>Phone Number: </label>
            <input
              type="tel"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
        </div>

        <button className="primary mt-4" onClick={bookPlace}>
          Book this place
          {NumberofDays > 0 && (
            <>
              <span> ${cost}</span>
            </>
          )}
        </button>
      </div>
    </>
  );
}