import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { useAuth } from '../context/Auth'
import Student from '../components/Student'

const Recruitment = () => {
    const{id}=useParams()
    const [student,setstudent]=useState()
      
    const[auth]=useAuth()
const getRound=async()=>{
    if(auth.token!==null){
          const response = await fetch(`http://localhost:3000/api/round/getRound/${id}`, {
     method: "GET",
     headers: {
       Authorization: auth?.token,
     },
   });

   const res = await response.json();
   if (response.ok) {
     setstudent(res);
   
   }
 }
    
}
    useEffect(()=>{
getRound()
    },[auth])
   const accept=async(userId)=>{
    console.log(" id ",id," userId ",userId," sigId ",student?.sig)
     const response = await fetch(
       `http://localhost:3000/api/round/select/${id}`,
       {
         method: "POST",
         headers: {
           Authorization: auth?.token,
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
          sigId:student?.sig,
          userId
         }),
       }
       
     );
     console.log(response)
     if(response.ok){
        getRound()
     }
   }
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-gray-600">Name</th>
              <th className="px-6 py-3 text-left text-gray-600">Email</th>
              <th className="px-6 py-3 text-center text-gray-600">Cleared</th>
            </tr>
          </thead>
          <tbody>
            {student?.students?.map((s, i) => (
              <tr key={i} className="border-t border-gray-200">
                <Student data={s} />
                <td className="px-6 py-4 text-center">
                  <>
            
                    {student?.cleared?.includes(s) ? (
                      <button  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 mt-4">
                        Remove
                      </button>
                    ) : (
                      <button onClick={()=>accept(s)} className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 mt-4">
                        Accept
                      </button>
                    )}
                  </>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Recruitment
