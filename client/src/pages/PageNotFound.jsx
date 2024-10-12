import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div>
      <div className="text-center my-32">
        <h1 className="text-9xl">404</h1>
        <h2 className="text-5xl">Oops ! Page Not Found</h2>
        <br />
        <button className="bg-black p-2 rounded-lg">
          <Link to="/" className="text-3xl btn text-white">
            Go Back 
          </Link>
          <img src="" alt="" />
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
