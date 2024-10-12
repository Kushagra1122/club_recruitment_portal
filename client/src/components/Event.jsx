import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/Auth';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Event = () => {
    const [events,setevents]=useState([])
const [auth]=useAuth()
const getEvents = async () => {
  if (auth?.token !== null) {
    const response = await fetch(
      `http://localhost:3000/api/sigs/event`,
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
      setevents(res.arr);
    }
  }
};
useEffect(() => {
  getEvents();
}, [auth]);

const register=async(id)=>{
const response = await fetch(`http://localhost:3000/api/sigs/register/${id}`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: auth?.token,
  },
  body: JSON.stringify({
    userId:auth.user._id
  }),
});
 console.log(response);
 if (response.ok) {
  getEvents();
 toast("Registered successfully")
 }
}
  return (
    <div>
      {events.length > 0 ? (
        <ul className="space-y-4">
          {events.map((event, index) => (
            <li
              key={index}
              className="p-4 bg-green-50 rounded-md shadow-sm hover:shadow-lg"
            >
              <h3 className="font-bold text-gray-700">
                Recruitment in {event.name} sig
              </h3>
              {event?.sigHead == auth?.user?._id ? (
                <Link
                  to={`/sigs/${event._id}`}
                  className="bg-green-500  text-white px-2 py-1 rounded hover:bg-green-700 mt-4"
                >
                  View rounds
                </Link>
              ) : event?.students?.includes(auth?.user._id) ? (
                <div className="bg-green-500 w-40 text-white px-2 py-1 mt-2 rounded-md">
                  Already registered
                </div>
              ) : auth?.user?.role === "Student"? (
                <button
                
                  onClick={() => register(event._id)}
                  className="bg-green-500 text-white px-2 py-1 mt-2 rounded-md"
                >
                  Register now
                </button>
              ) : (
                <button className="bg-yellow-500 text-white px-2 py-1 mt-2 rounded-md">
                  View
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-800">No upcoming events.</p>
      )}
    </div>
  );
}

export default Event
