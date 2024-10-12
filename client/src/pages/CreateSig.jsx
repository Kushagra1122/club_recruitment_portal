import React, { useState } from "react";
import { useAuth } from "../context/Auth";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import { useParams } from "react-router";

const CreateSig = () => {
  const [auth] = useAuth();
  const [name, setname] = useState("");
  const [desc, setdesc] = useState("");
  const [email, setemail] = useState("");
  const[startDate,setstartDate]=useState(new Date())
  const {id}=useParams()
  const func = async (e) => {
    e.preventDefault();
    setemail(auth?.user?.email);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:3000/api/sigs/add/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: auth?.token,
          },
          body: JSON.stringify({
            contact:email,
            desc,
            name,
            Start:startDate,
          

          }),
        }
      );

      console.log(response);
      const res = await response.json();
      if (response.ok) {
        toast.success("Sig created");
        setemail("");
        setdesc("");
        setname("");
        setstartDate(new Date())
      } else {
        toast.error(res.nessage);
      }
    } catch (error) {}
  };
  return (
    <div>
      <form
        className="w-full max-w-3xl mx-auto my-5  bg-white p-6 "
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-4 text-center">
          Create a New Sig
        </h2>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
            Sig Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setname(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter Sig name"
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
            placeholder="Enter Sig description"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="recruitmentStartDate"
            className="block text-gray-700 font-bold mb-2"
          >
            Recruitment Start Date
          </label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setstartDate(date)}
            dateFormat="yyyy/MM/dd"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
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
            placeholder="Enter Sig contact email"
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
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateSig;
