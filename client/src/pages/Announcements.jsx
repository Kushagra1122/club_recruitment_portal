import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/Auth';
import { Link } from 'react-router-dom';
import * as XLSX from "xlsx";
const Announcements = () => {
  const [auth] = useAuth();
  const [announce, setannounce] = useState([]);
      const [loading, setLoading] = useState(false);
  const getAnnouncements = async () => {

    if (auth?.token !== null) {
       
      const response = await fetch(`http://localhost:3000/api/announce/send`, {
        method: "GET",
        headers: {
          Authorization: auth?.token,
        },
      });
      console.log(response)
      const res = await response.json();
      if (response.ok) {
        console.log(res)
        setannounce(res)
      }
    }
  };
  useEffect(() => {
    getAnnouncements();
  }, [auth]);
    const formatDate = (isoDateString) => {
      const date = new Date(isoDateString);
      return `${date.toLocaleDateString()} `;
    };
    const allot = async () => {
      setLoading(true);
      try {
        if (auth?.token !== null) {
          const response = await fetch(`http://localhost:3000/api/auth/allot`, {
            method: "GET",
            headers: {
              Authorization: auth?.token,
            },
          });
          const res = await response.json();
          if (response.ok) {
           
           downloadExcel(res)
          }
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

  const downloadExcel = (data) => {
    console.log("HERE")
    console.log(data)
    // Convert JSON data to a worksheet
    const worksheet = XLSX.utils.json_to_sheet(data);

    // Create a new workbook
    const workbook = XLSX.utils.book_new();

    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, "Allotted Students");

    // Write the workbook as an Excel file and trigger download
    XLSX.writeFile(workbook, "allotted_students.xlsx");
  };
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Recruitment Announcements</h1>

      {announce.length === 0 ? (
        <p>No announcements available at the moment.</p>
      ) : (
        <div className="space-y-4">
          {announce.map((announcement, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg shadow-md">
              {announcement.type === "Message" ? (
                announcement.role === "Admin" ? (
                  <>
                    <p className="text-gray-700 mt-2">
                      By :{" " + announcement.name}
                    </p>
                    <p className="text-gray-700 mt-2">
                      <strong>Details : </strong> {announcement.msg}
                    </p>
                  </>
                ) : (
                  <>
                    Announcement from {" " + announcement.club}
                    {" " + announcement.sig}
                    <p className="text-gray-700 mt-2">
                      by :{" " + announcement.name}
                    </p>
                    <p className="text-gray-700 mt-2">
                      <strong>Details : </strong> {announcement.msg}
                    </p>
                  </>
                )
              ) : announcement.type === "Recruitment" ? (
                <>
                  Announcement from {" " + announcement.club}
                  {" " + announcement.sig}
                  <p className="text-gray-700 ">
                    by :{" " + announcement.name}
                  </p>
                  <strong>Recruitment starts on : </strong>{" "}
                  {formatDate(announcement.date)}
                </>
              ) : announcement.type === "Club" ? (
                <>
                  <p className="text-gray-700 mt-2">
                    By :{" " + announcement.name}
                  </p>
                  <p className="text-gray-700 mt-2">
                    <strong>Details : </strong> Club {" " + announcement.msg}
                  </p>
                  {auth?.user?.role === "Student" ? (
                    <Link to={"/clubPrefer"}>
                      {auth?.user?.clubPreference?.length === 0 ? (
                        <button className="bg-blue-500 text-white px-2 py-1 my-2 rounded hover:bg-blue-700">
                          Fill Now!!
                        </button>
                      ) : (
                        <>Already filled</>
                      )}
                    </Link>
                  ) : (
                    <></>
                  )}
                </>
              ) : announcement.type === "Sig" ? (
                <>
                  <p className="text-gray-700 mt-2">
                    By :{" " + announcement.name}
                  </p>
                  <p className="text-gray-700 my-2">
                    <strong>Details : </strong> {" " + announcement.msg} for{" "}
                    {" " + announcement.club}
                  </p>
                  {auth?.user?.role === "Student" ? (
                    <div>
                      <Link
                        to={`/sigPrefer/${announcement.clubid}`}
                        className="bg-blue-500 text-white px-2 py-1 my-2 rounded hover:bg-blue-700"
                      >
                        Fill Now!!
                      </Link>
                    </div>
                  ) :  (
                    <></>
                  )}
                </>
              ) :announcement.type === "Allot" ? (
                    <>
                      <p className="text-gray-700 mt-2">
                        By :{" " + announcement.name}
                      </p>
                      <p className="text-gray-700 mt-2">
                        <strong>Details : </strong> Club{" "}
                        {" " + announcement.msg}
                      </p>
                      {loading?<>loading...</>:
                        <button
                          onClick={allot}
                          className="bg-green-500 text-white px-2 py-1 my-2 rounded hover:bg-green-700"
                        >
                          Download excel sheet
                        </button>
                      }
                    </>
                  ) : (
                <></>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Announcements
