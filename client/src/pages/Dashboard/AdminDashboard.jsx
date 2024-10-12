import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Event from "../../components/Event";

const AdminDashboard = () => {
  const [auth] = useAuth();
  const [registerClubs, setRegisterClubs] = useState([]);
const [data,setdata]=useState([])
    const [announcement, setAnnouncement] = useState("");
 const[released,setreleased]=useState(false)

    const [Allot,setAllot]=useState(false)
    const func = async () => {
  
      if (auth?.token !== null) {
        const response = await fetch(`http://localhost:3000/api/clubs/req`, {
          method: "GET",
          headers: {
            Authorization: auth?.token,
          },
        });
        console.log(response);
        const res = await response.json();
        console.log(res);
        setRegisterClubs(res.arr);
      }
    }
 
    useEffect(() => {
       
 func();
        
     
    }, [auth]);
    
    const accept=async(id)=>{
       
  const response = await fetch(`http://localhost:3000/api/clubs/accept/${id}`, {
    method: "PATCH",
    headers: {
      Authorization: auth?.token,
    },
  });


  if(response.ok){
   
    func()
    toast.success("accepted")
  }
    }
     const reject = async (id) => {
     
       const response = await fetch(
         `http://localhost:3000/api/clubs/reject/${id}`,
         {
           method: "PATCH",
           headers: {
             Authorization: auth?.token,
           },
         }
       );
     
     
       if (response.ok) {
         func();
         toast.success("rejected");
       }
     };
     const prefer=async()=>{
     
       const response = await fetch(`http://localhost:3000/api/announce/add`, {
         method: "POST",
         headers: {
           Authorization: auth?.token,
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
          announcement:"Preference form",
           name: auth?.user?.name,
           role: auth?.user?.role,
           id:'',
           prefer: "Club",
          
         }),
       });
       const res=await response.json()
         if (response.ok) {

           toast.success("released");
           check()
         }
     }
     const check=async()=>{
       if (auth?.token !== null) {
       const response = await fetch(
         `http://localhost:3000/api/announce/prefer`,
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
              setreleased(res);
            }
     }
    }
     useEffect(()=>{
      check()
     },[auth,prefer])
     
      

     
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
               id:null,
               prefer:"",
               name: auth?.user?.name,
               role: auth?.user?.role,
             }),
           }
         );

         const res = await response.json();
         if (response.ok) {
           setAnnouncement("");
           toast.success("Posted");
         }
       };

  const alloted = async () => {
    const response = await fetch(`http://localhost:3000/api/announce/add`, {
      method: "POST",
      headers: {
        Authorization: auth?.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        announcement: "Alloted students list",
        name: auth?.user?.name,
        role: auth?.user?.role,
        id: "",
        prefer: "Allot",
      }),
    });
    const res = await response.json();
    if (response.ok) {
      toast.success("released");
      checkreleased();
    }
  };
  const checkreleased = async () => {
    if (auth?.token !== null) {
      const response = await fetch(
        `http://localhost:3000/api/announce/checkAllot`,
        {
          method: "GET",
          headers: {
            Authorization: auth?.token,
          },
        }
      );
      const res = await response.json();
      if (response.ok) {
        console.log(res);
        setAllot(res);
      }
    }
  };
  useEffect(() => {
    checkreleased();
  }, [auth, Allot]);
     
      
  return (
    <div>
      <div className="min-h-screen dash bg-gray-100">
        <div className="container mx-auto py-10 px-4 md:px-8">
          <div className="bg-gray-300 shadow-md rounded-lg p-8 mb-10">
            <h1 className="text-3xl font-extrabold text-black ">
              Welcome, {auth?.user?.name}
            </h1>
            <p className="text-gray-800 mt-2">
              Here's your dashboard, where you can manage your club
              registrations and view your upcoming events.
            </p>
          </div>

          <div className="mb-12 ">
            <div className="bg-gray-300 shadow-md rounded-lg p-8">
              <h2 className="text-2xl font-bold text-black mb-6">Requests</h2>
              {registerClubs?.length ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {registerClubs.map((club, index) => (
                    <div
                      key={index}
                      className="p-6 dash bg-white rounded-md border border-black shadow-sm hover:shadow-lg transform hover:scale-105 transition-transform duration-200"
                    >
                      <p className="  mb-1">
                        Name:
                        <span className="text-lg font-semibold  mb-2 ml-2">
                          {club.name}
                        </span>
                      </p>
                      <p className=" mb-1 ">
                        Description:
                        <span className="text-blue-600 font-semibold ml-2">
                          {club.description}
                        </span>
                      </p>
                      <p className=" mb-1 ">
                        Exclusive:
                        <span className=" font-semibold ml-2">
                          {club.exclusive ? <>Yes</> : <>No</>}
                        </span>
                      </p>
                      <p className=" mb-1 ">
                        Contact:
                        <span className="text-lg  ml-2">{club.contact}</span>
                      </p>

                      <div className="flex justify-between pt-3">
                        <button
                          onClick={() => accept(club._id)}
                          className="mt-4  py-1 w-36 flex justify-center bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => reject(club._id)}
                          className="mt-4  py-1 w-36 flex justify-center bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                        >
                          Reject
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-12 items-center gap-3">
                  <p className="text-gray-800">No requests</p>
                </div>
              )}
            </div>
          </div>
          <div className="mb-12">
            <div className="bg-gray-300 shadow-md rounded-lg p-8">
              <h2 className="text-2xl font-bold text-black mb-6">
                Club Preference form
              </h2>
              {released ? (
                <>Preference form is Released</>
              ) : (
                <button
                  onClick={prefer}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
                >
                  Release preference for exclusive club
                </button>
              )}
            </div>
          </div>
          <div className="mb-12">
            <div className="bg-gray-300 shadow-md rounded-lg p-8">
              <h2 className="text-2xl font-bold text-black mb-6">
                Allot clubs
              </h2>
              {

                  !Allot?
                
                <button
                  onClick={alloted}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mt-4"
                >
                  Release excel sheet
                </button>
              :<>released</>}
            </div>
          </div>
          <div className="mb-12">
            <div className="bg-gray-300 shadow-md rounded-lg p-8">
              <h2 className="text-2xl font-bold text-black mb-6">
                Upcoming Recruitment Events
              </h2>
              <Event />
            </div>
          </div>
          <div className="mb-12">
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
          </div>

          <div className="bg-gray-300 shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-black mb-6">
              Profile & Settings
            </h2>
            <div className="flex flex-col space-y-4">
              <div>
                <p className="font-semibold text-gray-800">
                  Name: {auth?.user?.name}
                </p>
                <p className="font-semibold text-gray-800">
                  Email: {auth?.user?.email}
                </p>
                <p className="font-semibold text-gray-800">
                  Role: {auth?.user?.role}
                </p>
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                  Edit Profile
                </button>
              </div>
              <div>
                <Link
                  to={"/create"}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                >
                  View clubs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
