export default function BookingForm({place}){
    console.log(place)
    return (
      <>
        <div className="bg-white shadow rounded-2xl p-4 grid gap-2">
          <div className="text-2xl text-center">Price: {place.price}</div>
          <div className="border rounded-2xl mt-4">
            <div className="flex">
              <div className="px-3 py-4 ">
                <label>Check in: </label>
                <input type="date" />
              </div>
              <div className="px-3 py-4 border-l">
                <label>Check out: </label>
                <input type="date" />
              </div>
            </div>
            <div className="px-3 py-4 border-t">
              <label>Guests: </label>
              <input type="number" />
            </div>

          </div>

          <button className="primary mt-4">Book</button>
        </div>
      </>
    );
}