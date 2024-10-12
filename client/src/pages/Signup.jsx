import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';

const Signup = () => {
     const [name, setname] = useState("");
      const [email, setemail] = useState("");
     const [password, setpassword] = useState("");
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
       if  (auth?.user !== null) {
          navigate("/");
        }
    
  });

      const handlesubmit = async (e) => {
        e.preventDefault();

        try {
          const response = await fetch(
            `http://localhost:3000/api/auth/register`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                name,
                email,
                password,
              }),
            }
          );

          console.log(response);
          const res = await response.json();
          console.log(res);
          if (response.ok) {
            toast.success(res.message);
            navigate("/login");
            setname("");
            setemail("");
            setpassword("");
          } else {
            toast.error(res.message);
          }
        } catch (error) {
          console.log(error);
        }
      };
  return (
    <div>
      <div className="flex flex-col gap-4 mt-32  items-center  w-screen">
        <span className="text-3xl  font-bold">Sign Up</span>
        <span className="text-xl p-2">Create Your Account</span>
        <form className="flex flex-col gap-4 " onSubmit={handlesubmit}>
          <input
            type="text"
            placeholder="Name"
            className="border p-2 border-gray-500 w-80 rounded-lg outline-none"
            value={name}
            onChange={(e) => setname(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 border-gray-500 w-80 rounded-lg outline-none"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 border-gray-500 w-80 rounded-lg outline-none"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-80 bg-red-500 text-white py-2 mt-5 hover:bg-red-600 rounded-lg"
          >
            Signup
          </button>
          <div className="text-center mt-2">
            <span className="text-gray-500">Already have a account?</span>
            <Link to="/login" className="ml-3 cursor-pointer hover:underline">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup
