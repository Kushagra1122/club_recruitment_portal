import React, { useEffect, useState } from "react";
import { useAuth } from "../context/Auth";
import toast from "react-hot-toast";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const Sig = ({ sig ,get}) => {
  const [data, setdata] = useState([]);
  const [auth] = useAuth();
  const { id } = useParams();

  const getSig = async () => {
    if (auth?.token !== null) {
      const response = await fetch(
        `http://localhost:3000/api/sigs/getSig/${sig}`,
        {
          method: "GET",
          headers: {
            Authorization: auth?.token,
          },
        }
      );

      const res = await response.json();
      if (response.ok) {
        setdata(res);
      }
    }
  };
  useEffect(() => {
    getSig();
  }, [auth]);
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    return `${date.toLocaleDateString()} `;
  };
  const dlt = async () => {
  
    const response = await fetch(
      `http://localhost:3000/api/sigs/dlt/${sig}`,
      {
        method: "DELETE",
        headers: {
          Authorization: auth?.token,
        },
      }
    );
    if (response.ok) {
      toast.success("Deleted successfully");
      get();
    }
  };
  return (
    <div>
      <div className=" flex flex-col gap-2">
        <p>Name : {data.name}</p>
      
        <p>Description : {data.description}</p>
        <p>Start date : {formatDate(data.Start)}</p>
     
       
        <div className="flex justify-between">
          <Link to={`/sigs/${data._id}`} className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-700 mt-4">
            View
          </Link>
          <button
            onClick={dlt}
            className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700 mt-4"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sig;
