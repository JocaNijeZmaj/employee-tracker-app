import React from 'react'
import { useState, useEffect } from 'react'
import  { db }  from "../firebase-config";
import { collection, getDocs } from "firebase/firestore"
import axios from 'axios';
import { Employee } from '../entities';


export default function ManageEmployees() {


    let [showEdit, setShowEdit] = useState(false);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const employeesCollectionRef = collection(db, "employees")

    useEffect(() => {

        const getEmployees = async () => {
            const data = await getDocs(employeesCollectionRef);
            setEmployees(
              data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Employee))
            );
            console.log(data)
        }
        getEmployees()
    }, [])
    
      function handleShowEdit() {
        setShowEdit((current) => !current);
      }



    return (
      <div>
        <div className="EmployeesButton">
          <table className="styled-table">
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Date of birth</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Salary</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, key) => {
                return (
                  <tr className="active-row" key={employee.id}>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.dob}</td>
                    <td>{employee.email}</td>
                    <td>{employee.phoneNumber}</td>
                    <td>{employee.salary}</td>
                    <td>
                      {!showEdit && (
                        <button onClick={handleShowEdit}>Edit</button>
                      )}
                      {showEdit && (
                        <div>
                          <input
                            type="text"
                            placeholder={employee.firstName}
                            onChange={(event) => {
                              setNewName(event.target.value);
                            }}
                          />
                          <button
                            onClick={() => {
                              updateLastName(employee.id);
                            }}
                          >
                            Update
                          </button>{" "}
                          <button
                            className="deleteBtn"
                            onClick={handleShowEdit}
                          >
                            X
                          </button>
                        </div>
                      )}
                      {!showEdit && (
                        <button
                          className="deleteBtn"
                          onClick={() => {
                            deleteEmployee(employee.id);
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
}