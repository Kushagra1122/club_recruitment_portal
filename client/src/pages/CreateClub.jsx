import React, { useState } from 'react'
import { useAuth } from '../context/Auth';
import toast from 'react-hot-toast';

const CreateClub = () => {
     const [auth] = useAuth();
    const[name,setname]=useState('')
const [desc, setdesc] = useState("");
   const [email, setemail] = useState("");
     const [exclusive, setexclusive] = useState("");

     const handleOptionChange = (e) => {
       setexclusive(e.target.value);
     };
    const func=async(e)=>{
        e.preventDefault()
        setemail(auth?.user?.email)
    }
    const handleSubmit=async(e)=>{
        e.preventDefault()
try {
     const response = await fetch(
       `http://localhost:3000/api/clubs/create/${auth?.user?._id}`,
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           Authorization: auth?.token,
         },
         body: JSON.stringify({
           email,
        desc,
        name,
        exclusive
         }),
       }
     );

     console.log(response);
     const res = await response.json()
     if(response.ok){
        toast.success("Request sent")
        setemail("")
        setdesc("")
        setname("")
        setexclusive("")
     }
     else{
        toast.error(res.nessage);
     }
     
} catch (error) {
    
}
    }
    
  return (
    <div>
      <form
        className="w-full max-w-3xl mx-auto my-5  bg-white p-6 "
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Create a New Club
        </h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Club Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter club name"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={desc}
            onChange={(e) => setdesc(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter club description"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Exclusive
          </label>

          <div className="flex items-center ">
            <input
              type="radio"
              id="yes"
              name="agreement"
              value="yes"
              checked={exclusive === "yes"}
              onChange={handleOptionChange}
              className="mr-2"
            />
            <label htmlFor="yes" className="mr-4">
              Yes
            </label>

            <input
              type="radio"
              id="no"
              name="agreement"
              value="no"
              checked={exclusive === "no"}
              onChange={handleOptionChange}
              className="mr-2"
            />
            <label htmlFor="no">No</label>
          </div>

          <br />
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Contact
          </label>
          <input
            type="email"
            id="contact"
            name="contact"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter club contact email"
          />
          <div className="flex justify-start mt-4">
            <button
              className="bg-blue-500 text-sm hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline "
              onClick={(e) => func(e)}
            >
              Use your email
            </button>
          </div>
        </div>
        <div className="mb-6 mt-5 text-center">
          <button
            type="submit"
            className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline `}
          >
            Send to admin
          </button>
        </div>
      </form>
    </div>
  );
}

export default CreateClub
