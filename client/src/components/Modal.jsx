import React, { useState } from 'react'
import DatePicker from 'react-datepicker';
import { useAuth } from '../context/Auth';
import toast from 'react-hot-toast';

const Modal = ({onClose,id,start}) => {
const[name,setname]=useState('')
const [test, settest] = useState('');
const [desc, setdesc] = useState('');
const[ roundStart,setroundStart]=useState(start)
const [roundEnd, setroundEnd] = useState(start);
const[type,settype]=useState('')
const[auth]=useAuth()

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("HEY")
   try {
     const response = await fetch(
       `http://localhost:3000/api/round/add/${id}`,
       {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
           Authorization: auth?.token,
         },
         body: JSON.stringify({
          name,
          desc,
          type,
          test,
          roundStart,
          roundEnd
         }),
       }
     );

     console.log(response);
     const res = await response.json();
    
     if(response.ok){
        toast.success("Round created")
        setdesc("")
        setname("")
        settype("")
        settest("")
        setroundStart(new Date());
        setroundEnd(new Date());
        onClose()
     }
     else{
        toast.error(res.nessage);
     }
     
} catch (error) {
    
}
  };

  const handleStartDateChange = (date) => {
   setroundStart(date);
  };

  const handleEndDateChange = (date) => {
   setroundEnd(date);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-2xl font-semibold mb-4">
          Add New Recruitment Round
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Round Name</label>
            <input
              type="text"
              className="w-full border border-gray-300 p-2 rounded-md"
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="e.g., Technical Round"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Round type</label>

            <select
              defaultValue={"DEFAULT"}
              className="w-full border border-gray-300 p-2 rounded-md"
              onChange={(e) => {
                settype(e.target.value);
              }}
            >
              <option value="DEFAULT" disabled>
                Select Round type
              </option>
              <option value="OA">OA</option>
              <option value="Interview">Interview</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="recruitmentStartDate"
              className="block text-gray-700 font-bold mb-2"
            >
              Recruitment Start Date
            </label>
            <DatePicker
              selected={roundStart}
              onChange={handleStartDateChange}
              minDate={new Date(start)}
  
              dateFormat="yyyy/MM/dd"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="recruitmentEndDate"
              className="block text-gray-700 font-bold mb-2"
            >
              Recruitment End Date
            </label>
            <DatePicker
              selected={roundEnd}
              onChange={handleEndDateChange}
              minDate={new Date(roundStart)}
              dateFormat="yyyy/MM/dd"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <textarea
              className="w-full border border-gray-300 p-2 rounded-md"
              value={desc}
              onChange={(e) => setdesc(e.target.value)}
              placeholder="Brief description of the round"
              required
            />
          </div>
          {type === "OA" ? (
            <div className="mb-4">
              <label className="block text-gray-700">Test Link</label>
              <input
                type="text"
                className="w-full border border-gray-300 p-2 rounded-md"
                value={test}
                onChange={(e) => settest(e.target.value)}
                placeholder="Test Link"
              />
            </div>
          ) : (
            <div></div>
          )}

          <div className="flex justify-end">
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 mr-2 rounded-md"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add Round
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Modal
