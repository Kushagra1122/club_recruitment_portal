import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/Auth'
import toast from 'react-hot-toast'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'

const Round = ({round ,onClose,get,value}) => {
    const [data,setdata]=useState([])
    const [auth]=useAuth()
    const {id}=useParams()
    const getRound=async()=>{
 if (auth?.token !== null ) {
   const response = await fetch(`http://localhost:3000/api/round/getRound/${round}`, {
     method: "GET",
     headers: {
       Authorization: auth?.token,
     },
   });

   const res = await response.json();
   if (response.ok) {
     setdata(res);
   }
 }
    }
     const dlt = async () => {
       console.log(id, round);
       const response = await fetch(
         `http://localhost:3000/api/round/dlt/${round}`,
         {
           method: "DELETE",
           headers: {
             Authorization: auth?.token,
           },
         }
       );
       if (response.ok) {
         toast.success("Deleted successfully");
         get()
       }
     };
    useEffect(()=>{
getRound()
    },[auth,round,onClose,dlt])
    const formatDate = (isoDateString) => {
      const date = new Date(isoDateString);
      return `${date.toLocaleDateString()} `;
    };
   
  return (
    <div>
      <div className=" flex flex-col gap-2">
        <p>Name : {data.name}</p>
        <p>Type : {data.type}</p>
        <p>Description : {data.desc}</p>
        <p>Start date : {formatDate(data.roundStart)}</p>
        <p>End date : {formatDate(data.roundEnd)}</p>
        <p>
          {" "}
          {data.test !== "" ? (
            <>Test link : {data.test}</>
          ) : (
            <>Test link : No test link </>
          )}
        </p>
        <div className="flex justify-between">
          <Link
            to={`/recruitment/${data._id}`}
            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700 mt-4"
          >
            View
          </Link>
          {value ? (
            <></>
          ) : (
            <button
              onClick={dlt}
              className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 mt-4"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Round
