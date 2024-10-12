import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

const SigPrefer = () => {
  const [sigs, setSigs] = useState([]);

  const [auth] = useAuth();
  const navigate = useNavigate();
const {id}=useParams()
  const getExclusivesig = async () => {
    if (auth?.token !== null) {
      const response = await fetch(
        `http://localhost:3000/api/clubs/sendsig/${auth?.user?._id}`,
        {
          method: "POST",
          headers: {
            Authorization: auth?.token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
          }),
        }
      );
      const res = await response.json();

      if (response.ok) {
        console.log(res);
        setSigs(res);
      }
    }
  };

  useEffect(() => {
    getExclusivesig();
  }, [auth]);

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const newSigs = [...sigs];
    const temp = newSigs[index];
    newSigs[index] = newSigs[index - 1];
    newSigs[index - 1] = temp;
    let arr = [];
    for (let i = 0; i < newSigs.length; i++) {
      arr.push(newSigs[i]);
    }
    setSigs(arr);
  };

  const handleMoveDown = (index) => {
    if (index === sigs.length - 1) return;
    const newSigs = [...sigs];
    const temp = newSigs[index];
    newSigs[index] = newSigs[index + 1];
    newSigs[index + 1] = temp;
    let arr = [];
    for (let i = 0; i < newSigs.length; i++) {
      arr.push(newSigs[i]);
    }
    setSigs(arr);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const response = await fetch(`http://localhost:3000/api/auth/sigPrefer`, {
      method: "POST",
      headers: {
        Authorization: auth?.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sigs,
        id,
      }),
    });
    console.log(response);

    if (response.ok) {
      toast.success("Preference saved");
      navigate("/announcement");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-5 rounded my-10 ">
      <h2 className="text-2xl font-semibold text-center mb-4">
        Sig Preference Order Form
      </h2>
      {sigs.length === 0 ? (
        <p className="text-center text-2xl font-bold my-10">
          No Exclusive club is registered yet
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <ul className="space-y-2">
            {sigs.map((sig, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-200 p-3 rounded"
              >
                <span className="text-gray-700">{sig.name}</span>
                <div>
                  <button
                    type="button"
                    onClick={() => handleMoveUp(index)}
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-1"
                  >
                    ↑
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveDown(index)}
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    ↓
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mt-4"
          >
            Submit Preferences
          </button>
        </form>
      )}
    </div>
  );
};
export default SigPrefer;
