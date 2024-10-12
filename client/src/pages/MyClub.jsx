import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import toast from "react-hot-toast";
import Sig from "../components/Sig";

const MyClub = () => {
  const [club, setclub] = useState({});

  const [announcement, setAnnouncement] = useState("");
  const [auth] = useAuth();
  const [sigs, setsigs] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const[ id,setid]=useState()
  const[startDate,setstartDate]=useState(new Date())
  const getClub = async () => {
    if (auth?.token !== null) {
      const response = await fetch(
        `http://localhost:3000/api/clubs/getClub/${auth.user._id}`,
        {
          method: "GET",
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      const res = await response.json();
      if (response.ok) {
      
       setid(res[0]._id)
        setclub(res[0]);
        
      }
    }
  };

  
const view=async()=>{
     if ((auth?.token !== null)&&(id!==undefined)) {
     
       const response = await fetch(
         `http://localhost:3000/api/sigs/view/${id}`,
         {
           method: "GET",
           headers: {
             Authorization: auth?.token,
           },
         }
       );
     
       const res = await response.json();
       if (response.ok) {
         setsigs(res)
        
      
       }
     }
}
const start=async()=>{

    const response = await fetch(
      `http://localhost:3000/api/clubs/startRecruitement/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: auth?.token,
        },
      }
    );
    console.log(response)
     if (response.ok) {
       toast.success("Recruitment has been started")
     
}}
  const exportRegisteredStudents = () => {
    // Logic for exporting the registered students list as Excel or PDF
  };
  useEffect(() => {
    getClub();

  }, [auth]);
  useEffect(()=>{
        view();
  },[id])
const save=async(id)=>{
      console.log(startDate);
    const response = await fetch(
      `http://localhost:3000/api/clubs/startdate/${id}`,
      {
        method: "PATCH",
        headers: {
          Authorization: auth?.token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          startDate,
        }),
      }
    );
     if (response.ok) {
    getClub()
     }
}
 const formatDate = (isoDateString) => {
   const date = new Date(isoDateString);
   return `${date.toLocaleDateString()} `;
 };
 const onClose=async()=>{
    setShowModal(false)
    getClub()
 }
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Club Dashboard</h1>
      <div className="bg-gray-300 shadow-md p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Club Details</h2>
        <p>
          <strong>Name:</strong> {club?.name}
        </p>
        <p>
          <strong>Description:</strong> {club?.description}
        </p>
        <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 mt-4">
          Edit
        </button>
      </div>

      <div className="bg-gray-300 shadow-md p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Sigs</h2>
        {club?.sig?.length!==0?
             <div>
           {club?.sig?.map((sig,index) => (
            
            <div key={index} className=" max-w-sm rounded-md mb-5 px-5 py-2  bg-white">
       <Sig sig={sig} get={getClub} />
            </div>
          ))} 
        </div>:
        <div>

        </div>
        }
       
        <Link to={`/createSigs/${club._id}`}
        
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
        >
          Add sig
        </Link>
      </div>

      <div className="bg-gray-300 shadow-md p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Members</h2>
       
      </div>
      {showModal ? (
        <Modal id={club._id} onClose={onClose} start={club.Start} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default MyClub;
