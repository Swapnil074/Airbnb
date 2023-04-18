import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Index  () {
  const [places,setPlaces]=useState([])
  useEffect(() => {
    axios.get('/places').then(res=>setPlaces([...res.data]))
  }, []);
  console.log(places)
    return (
        <>
        <div className='grid mt-8 grid-cols-2 gap-x-6 gap-y-8 md: grid-cols-3 lg:grid-cols-4'>
          {places.length>0 && places.map(place=>(
          <Link to={'/places/'+place._id}>
            <div className='bg-gray-500 mb-2 rounded-2xl flex '>
            <img className="rounded-2xl gap-5 object-cov  er aspect-square" src={'http://localhost:4000/uploads/'+place.photos?.[0]} alt="cover"/>

            </div>
            <h3 className='font-bold'>{place.address}</h3>
            <h2 className='text-sm  text-gray-500'>{place.title}</h2>
            <div className='mt-2'><span className='font-bold'> {place.price}</span></div>
          </Link>
          )

          )}
        </div>
      </>
    );
}
 