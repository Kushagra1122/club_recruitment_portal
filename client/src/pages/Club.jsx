import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/Auth';


const Club = () => {
    const[clubs,setclubs]=useState([])
     const [auth, setAuth] = useAuth();
    const getClubs=async()=>{
       
        if(auth?.token!==null){
           
const response = await fetch(`http://localhost:3000/api/clubs/get`, {
  method: "GET",
  headers: {
    Authorization: auth?.token,
  },
});
const res=await response.json()
if (response.ok) {
    console.log(res)
  setclubs(res.arr);
}
        }
        
    }
    useEffect(()=>{
getClubs()
    },[auth])
     const remove = async (id) => {
       const response = await fetch(
         `http://localhost:3000/api/clubs/dlt/${id}`,
         {
           method: "DELETE",
           headers: {
             Authorization: auth?.token,
           },
         }
       );

       if (response.ok) {
         getClubs();
         toast.success("removed");
       }
     };
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Clubs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {clubs.map((club) => (
          <div key={club._id} className=" bg-gray-100 shadow-md p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-2">{club.name}</h2>
            <p className="text-gray-600 mb-4">{club.description}</p>

            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">
              View Announcements
            </button>
            {((auth.user.role === "Admin")||(auth.user._id===club.convenor)) ? (
              <button onClick={()=>remove(club._id)}className="bg-red-500  mx-5 text-white px-4 py-2 rounded hover:bg-red-700">
                 Remove
              </button>
            ) : (
              <></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Club
