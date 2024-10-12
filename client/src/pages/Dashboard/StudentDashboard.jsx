import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/Auth";
import { Link } from "react-router-dom";
import Event from "../../components/Event";

const StudentDashboard = () => {
  const [auth, setAuth] = useAuth();
  const [registeredClubs, setRegisteredClubs] = useState([]);
  const [recruitmentSchedule, setRecruitmentSchedule] = useState([]);
  return (
    <div>
      <div className="min-h-screen dash bg-gray-100">
        <div className="container mx-auto py-10 px-4 md:px-8">
          <div className="bg-gray-300 shadow-md rounded-lg p-8 mb-10">
            <h1 className="text-3xl font-extrabold text-black ">
              Welcome, {auth?.user?.name}
            </h1>
            <p className="text-gray-800 mt-2">
              Here's your dashboard, where you can manage your club
              registrations and view your upcoming events.
            </p>
          </div>

          <div className="mb-12">
            <div className="bg-gray-300 shadow-md rounded-lg p-8">
              <h2 className="text-2xl font-bold text-black mb-6">
                Your Registered Clubs
              </h2>
              {registeredClubs.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {registeredClubs.map((club, index) => (
                    <div
                      key={index}
                      className="bg-blue-100 p-6 rounded-md shadow-sm hover:shadow-lg transform hover:scale-105 transition-transform duration-200"
                    >
                      <h3 className="text-lg font-semibold text-gray-700 mb-2">
                        {club.name}
                      </h3>
                      <p className="text-gray-600  mb-1">
                        Status:
                        <span className="text-blue-600">{club.status}</span>
                      </p>
                      <p className="text-gray-600">
                        Round:
                        <span className="text-blue-600">
                          {club.currentRound}
                        </span>
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-12 items-center gap-5">
                  <p className="text-gray-800">
                    You have not registered for any clubs yet.
                    <Link
                      to={"/clubs"}
                      className="text-blue-600 hover:underline"
                    >
                      {" "}
                      Explore Clubs
                    </Link>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="mb-12">
            <div className="bg-gray-300 shadow-md rounded-lg p-8">
              <h2 className="text-2xl font-bold text-black mb-6">
                Upcoming Recruitment Events
              </h2>
              <Event />
            </div>
          </div>

          <div className="bg-gray-300 shadow-md rounded-lg p-8">
            <h2 className="text-2xl font-bold text-black mb-6">
              Profile & Settings
            </h2>
            <div className="flex flex-col space-y-4">
              <div>
                <p className="font-semibold text-gray-800">
                  Name: {auth?.user?.name}
                </p>
                <p className="font-semibold text-gray-800">
                  Email: {auth?.user?.email}
                </p>
                <p className="font-semibold text-gray-800">
                  Role: {auth?.user?.role}
                </p>
                <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
                  Edit Profile
                </button>
              </div>
              <div>
                <Link
                  to={"/clubs/create"}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Create a club
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
