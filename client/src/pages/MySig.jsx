
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import { Link, useParams } from "react-router-dom";
import Modal from "../components/Modal";
import toast from "react-hot-toast";
import Sig from "../components/Sig";
import Round from "../components/Round";

const MySig = () => {
  const [sig, setsig] = useState({});

  const [announcement, setAnnouncement] = useState("");
  const [auth] = useAuth();
  
  const [showModal, setShowModal] = useState(false);
  const [startDate, setstartDate] = useState(new Date());
  const {id}=useParams()
  const getSig = async () => {
    if (auth?.token !== null) {
      const response = await fetch(
        `http://localhost:3000/api/sigs/getSig/${id}`,
        {
          method: "GET",
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      const res = await response.json();
      if (response.ok) {
      console.log(res)
      setsig(res)
      }
    }
  };

 const handleAnnouncementSubmit = async () => {
   const response = await fetch(
     `http://localhost:3000/api/announce/add/`,
     {
       method: "POST",
       headers: {
         Authorization: auth?.token,
         "Content-Type": "application/json",
       },
       body: JSON.stringify({
         announcement,
         id,
         prefer:"",
         name:auth?.user?.name,
          role:auth?.user?.role,
         
       }),
     }
   );

   const res = await response.json();
   if (response.ok) {
    setAnnouncement("")
    toast.success("Posted")
   }
 };

  const start = async () => {
   
    const response = await fetch(`http://localhost:3000/api/announce/add`, {
      method: "POST",
      headers: {
        Authorization: auth?.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
      
        name:auth?.user?.name,
        role:auth?.user?.role,
        id,
        prefer:"Recruitment",
        date:sig?.Start
      }),
    });
    console.log(response);
    if (response.ok) {
      toast.success("Recruitment has been started");
      getSig()
    }
  };
  const exportRegisteredStudents = () => {
    // Logic for exporting the registered students list as Excel or PDF
  };
  useEffect(() => {
    getSig();
  }, [auth]);
  // useEffect(() => {
  //   view();
  // }, [id]);


  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return `${date.toLocaleDateString()} `;
  };
  const onClose = async () => {
    setShowModal(false);
    getSig();
  };
 
  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Sig Dashboard</h1>
      <div className="bg-gray-300 shadow-md p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Sig Details</h2>
        <p>
          <strong>Name:</strong> {sig?.name}
        </p>
        <p>
          <strong>Description:</strong> {sig?.description}
        </p>
        <p>
          <strong>Starts on :</strong> {formatDate(sig?.Start)}
        </p>
        <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 mt-4">
          Edit
        </button>
      </div>

      <div className="bg-gray-300  shadow-md p-6 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4">Rounds</h2>
        {sig?.rounds?.length !== 0 ? (
          <div>
            <div className="flex  gap-5">
              {sig?.rounds?.map((round, index) => (
                <div
                  key={index}
                  className=" max-w-sm rounded-md mb-5 px-5 py-2  bg-white"
                >
                  <Round
                    round={round}
                    sig={sig._id}
                    get={getSig}
                    value={sig?.recruiting}
                  />
                </div>
              ))}
            </div>
            {sig.recruiting ? (
              <></>
            ) : (
              <div className="flex gap-5">
                <button
                  onClick={start}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
                >
                  Start recruitment
                </button>
              </div>
            )}
          </div>
        ) : (
          <div></div>
        )}
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
        >
          Add round
        </button>
      </div>

      <div className="bg-gray-300 shadow-md p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Post Announcement</h2>
        <textarea
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          className="w-full border border-gray-300 p-2 rounded mb-2"
          placeholder="Enter your announcement"
        />
        <button
          onClick={handleAnnouncementSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Post Announcement
        </button>
      </div>
      {showModal ? (
        <Modal id={sig._id} onClose={onClose} start={sig.Start} />
      ) : (
        <></>
      )}
    </div>
  );
};

export default MySig
