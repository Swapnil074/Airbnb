import axios from "axios";
import { useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import PerkLabels from "../PerksLabel";
import PhotoUploader from "../PhotosUploader";

export default function Places() {
  const { action } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [photoLink, setPhotoLink] = useState("");
  const [description, setDescription] = useState();
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setcheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(2);
  const [redirectToPlacesList, setRedirectToPlacesList]=useState(false)

  function inputHeader(header) {
    return <h2 className="text-xl mt-4 ">{header}</h2>;
  }
  function inputDescription(text) {
    return <p className="text-gray-500 text-sm">{text}</p>;
  }
  function preInput(header, text) {
    return (
      <>
        {inputHeader(header)}
        {inputDescription(text)}
      </>
    );
  }

   async function addNewPlace(e){
     e.preventDefault();
     const placeData = {
       title,
       address,
       addedPhotos,
       description,
       perks,
       extraInfo,
       checkIn,
       checkOut,
       maxGuests,
     };
     await axios.post("/places", placeData);
     setRedirectToPlacesList(true);
   }
if(redirectToPlacesList && action!='new'){
  return(
    <Navigate to={'/account/places'}/>
  )
  }
  return (
    <div>
      {action !== "new" && (
        <div className="text-center">
          <Link
            className="inline-flex gap-1 bg-primary text-white py-2 px-6 rounded-full"
            to={"/account/places/new"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Add new Place
          </Link>
        </div>
      )}
      {action === "new" && (
        <div>
          <form onSubmit={e=>addNewPlace(e)}>
            {preInput("Title", "Title/heading for your place")}
            <input
              type="text"
              placeholder="title, for example: My apartment"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <h2 className="text-xl mt-4">Address</h2>
            <p className="text-gray-500 text-sm">Address to this place.</p>

            <input
              type="text"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {preInput("Photos", "More=Better")}
            <PhotoUploader
              addedPhotos={addedPhotos}
              photoLink={photoLink}
              setAddedPhotos={setAddedPhotos}
              setPhotoLink={setPhotoLink}
            />
            {preInput("Description", "Description of your place.")}
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {preInput("Perks", "Select all the perks of your place")}
            <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
              <PerkLabels selected={perks} onChange={setPerks} />
            </div>
            {preInput("ExtraInfo", "Any extra info you want to add")}
            <textarea
              value={extraInfo}
              onChange={(e) => setExtraInfo(e.target.value)}
            />
            {preInput("Check in&out times", "Add check in and check out time")}
            <div className="grid gap-2 sm:grid-cols-3">
              <div>
                <h3 className="mt-2 -mb-1 ">Check in time</h3>
                <input
                  type="text"
                  placeholder="14:00"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1 ">Check out time</h3>
                <input
                  type="text"
                  placeholder="12:00"
                  value={checkOut}
                  onChange={(e) => setcheckOut(e.target.value)}
                />
              </div>
              <div>
                <h3 className="mt-2 -mb-1 ">Max number of guests</h3>
                <input
                  type="text"
                  placeholder="2"
                  value={maxGuests}
                  onChange={(e) => setMaxGuests(e.target.value)}
                />
              </div>
            </div>
            <button className="primary my-4">Save</button>
          </form>
        </div>
      )}
    </div>
  );
}
