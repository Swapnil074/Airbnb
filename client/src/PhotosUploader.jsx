import axios from "axios";
export default function PhotoUploader({photoLink, setPhotoLink,setAddedPhotos,addedPhotos}){
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
      e.preventDefault();
      const files = e.target.files;
      const data = new FormData();
      for (let i = 0; i < files.length; i++) {
        data.append("photos", files[i]);
      }
      axios
        .post("/upload", data, {
          headers: { "Content-type": "multipart/form-data" },
        })
        .then((res) => {
          const { data: filenames } = res;
          setAddedPhotos((prev) => {
            return [...prev, ...filenames];
          });
          console.log(filenames);
        });
    }
    return (
      <>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add using a link..."
            value={photoLink}
            onChange={(e) => setPhotoLink(e.target.value)}
          />
          <button
            onClick={(e) => addPhotoByLink(e)}
            className="bg-gray-200 grow rounded-2xl px-4"
          >
            Add &nbsp; photo
          </button>
        </div>
        <div className="mt-2 grid h-32 gap-2 grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {addedPhotos.length > 0 &&
            addedPhotos.map((link) => (
              <div className="h-32 flex" key={link}>
                <img
                  className="rounded-2xl w-full object-coverz"
                  src={"http://localhost:4000/uploads/" + link}
                  alt="Photo"
                />
              </div>
            ))}
          <label className="cursor-pointer flex items-center gap-2 justify-center border bg-transparent rounded-2xl p-2 text-gray-600">
            <input
              type={"file"}
              multiple
              className="hidden"
              onChange={(e) => uploadPhoto(e)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-7 h-7"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
              />
            </svg>{" "}
            Upload
          </label>
        </div>
      </>
    );
}