import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/Auth';

const Student = ({data}) => {
    const [student,setstudent]=useState()
    const [auth]=useAuth()
    const getStudent = async () => {
      if (auth?.token !== null) {
        const response = await fetch(
          `http://localhost:3000/api/auth/getStudent/${data}`,
          {
            method: "GET",
            headers: {
              Authorization: auth?.token,
            },
          }
        );

        const res = await response.json();
      
        if (response.ok) {
          setstudent(res.user);
        }
      }
    };
    useEffect(() => {
      getStudent();
    }, [auth]);
  return (
    <>
      <td className="px-6 py-4 text-gray-800">{student?.name}</td>
      <td className="px-6 py-4 text-gray-800">{student?.email}</td>
    </>
  );
}

export default Student
