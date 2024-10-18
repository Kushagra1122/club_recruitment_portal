import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Auth';

const Login = () => {
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
         const response = await fetch(`http://localhost:3000/api/auth/login`, {
           method: "POST",
           headers: {
             "Content-Type": "application/json",
           },
           body: JSON.stringify({
             email,
             password,
           }),
         });

         console.log(response);
         const res = await response.json();
         console.log(res);
         if (response.ok) {
           setAuth({
             ...auth,
             user: res.user,
             token: res.token,
           });
           localStorage.setItem("auth", JSON.stringify({ token: res.token }));
           toast.success("login successfull");
           navigate("/");

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
      <div className="flex flex-col gap-4  mt-32 items-center  w-screen">
        <span className="text-3xl font-bold">Welcome Back</span>
        <span className="text-xl text-center p-2">
          Enter your credintials to get logged in
        </span>
        <form className="flex flex-col gap-4" onSubmit={handlesubmit}>
          <input
            type="email"
            placeholder="Email"
            className="border w-80 p-2 border-gray-500 rounded-lg outline-none"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="border w-80 p-2 border-gray-500 rounded-lg outline-none"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-80 bg-red-500 py-2 mt-5 hover:bg-red-600 text-white rounded-lg"
          >
            Login
          </button>
        </form>
        <div className="">
          <div className="text-center mt-2">
            <span className="text-gray-500">Don't have a account?</span>
            <Link to="/signup" className="ml-3 cursor-pointer  hover:underline">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login
