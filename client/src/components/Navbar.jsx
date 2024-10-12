import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { useTheme } from "../context/Theme";
import { useAuth } from "../context/Auth";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { GiHamburgerMenu } from "react-icons/gi";
import toast from "react-hot-toast";
const Navbar = () => {
  const [theme, setTheme] = useTheme();
  const [auth, setAuth] = useAuth();
  const [show, setshow] = useState(false);
  const navigate = useNavigate();
  const logout = () => {
        setshow(false);
    toast.success("You have logged out ");
    setAuth({
      ...auth,
      user: null,
      token: null,
    });

    localStorage.removeItem("auth");
    navigate("/login");
  };
 
  const handleTheme = () => {
    setTheme((prevState) => (prevState === "light" ? "dark" : "light"));
  };
 
  return (
    <div>
      <div className="bignav">
        <div className="flex nav  bg-gray-300 border-b border-black  z-50 shadow-xl justify-between items-center py-2 px-10 ">
          <Link to={"/"} className="text-2xl font-mono">
            NITK Clubs
          </Link>
          <div className="flex gap-10 text-xl ">
            <Link to={"/"}>Home</Link>
            <Link to={"/clubs"}>Clubs</Link>
            <Link to={'/announcement'}>Announcement</Link>
            <Link to={"/dashboard"}>Dashboard</Link>
          </div>
          <div className="flex gap-5 h-12 items-center">
            {auth?.user === null ? (
              <Link
                to={"/login"}
                className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-xl "
              >
                Login
              </Link>
            ) : (
              <button
                className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-xl"
                onClick={logout}
              >
                Logout
              </button>
            )}

            <div>
              <button onClick={handleTheme}>
                {theme === "light" ? (
                  <MdOutlineDarkMode size={35} />
                ) : (
                  <MdOutlineLightMode size={35} />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="smallnav">
        <div className="flex nav  bg-gray-300 border-b border-black  z-50 shadow-xl justify-between items-center py-3 px-10 ">
          <Link to={"/"} className="text-2xl font-mono">
            NITK Clubs
          </Link>
          <div
            className={show ? `bg-black text-white px-1` : ``}
            onClick={() => setshow(!show)}
          >
            {<GiHamburgerMenu size={30} />}
          </div>
        </div>
        <div>
          {show ? (
            <div className="flex justify-end  z-100">
              <div className="flex nav justify-start border-b rounded-lg border-s border-black px-3 bg-gray-300">
                <div className="flex  flex-col gap-2">
                  <span>Home</span>
                  <span>Clubs</span>
                  <span>Recruitments</span>
                  <div className="flex gap-2">
                    {auth?.user === null ? (
                      <Link
                        to={"/login"}
                        className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-xl "
                      >
                        Login
                      </Link>
                    ) : (
                      <button
                        className=" bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-xl"
                        onClick={logout}
                      >
                        Logout
                      </button>
                    )}
                    <button onClick={handleTheme}>
                      {theme === "light" ? (
                        <MdOutlineDarkMode size={35} />
                      ) : (
                        <MdOutlineLightMode size={35} />
                      )}
                    </button>
                  </div>
                  <div></div>
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
