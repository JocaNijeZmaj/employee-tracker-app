import React from 'react'
import { useState, useEffect } from 'react'
import  { db }  from "../firebase-config";
import { collection, getDocs , addDoc} from "firebase/firestore"
import "./manage-employees.scss";
import { Employee } from '../entities';


export default function ManageEmployees() {

    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newDob, setNewDob] = useState(0)
    const [newPhone, setNewPhone] = useState(0)
    const [newEmail, setNewEmail] = useState("");
    const [newSalary, setNewSalary] = useState(0);

    const [formValues, setFormValues] = useState({
      newFirstName,
      newLastName,
      newDob,
      newPhone,
      newEmail,
      newSalary
    });

    let [showCreateEmployee, setShowCreateEmployee] = useState(false);
    let [showEdit, setShowEdit] = useState(false);
    const [employees, setEmployees] = useState<Employee[]>([]);
    const employeesCollectionRef = collection(db, "employees")

    //getting all employees
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
    
    // creating employee
      const handleShowCreateEmployee = () => {
        setShowCreateEmployee((current) => !current);
      };


      const createEmployee = async () => {
        await addDoc(employeesCollectionRef, {
          firstName: newFirstName,
          lastName: newLastName,
          email: newEmail,
          phoneNumber: newPhone,
          dob: newDob,
          salary: newSalary,
        })
        setEmployees([
          ...employees,
          {
            firstName: newFirstName,
            lastName: newLastName,
            email: newEmail,
            phoneNumber: newPhone,
            dob: newDob,
            salary: newSalary,
          }
        ]);
        handleShowCreateEmployee();
      };


      const handleShowEdit = () => {
        setShowEdit((current) => !current);
      }



    return (
      <div>
        <div className="EmployeesButton">
          {!showCreateEmployee && (
            <button className="createBtn" onClick={handleShowCreateEmployee}>
              Create Employee
            </button>
          )}
          {showCreateEmployee && (
            <div className="createEmployeeBox">
              <input
                placeholder="First name"
                required
                value={formValues.newFirstName}
                onChange={(event) => {
                  setNewFirstName(event.target.value);
                }}
              />
              <input
                placeholder="Last name"
                required
                value={formValues.newLastName}
                onChange={(event) => {
                  setNewLastName(event.target.value);
                }}
              />
              <input
                type="date"
                required
                value={formValues.newDob}
                placeholder="Date of birth"
                onChange={(event) => {
                  setNewDob(
                    new Date(event.target.value).getTime() //Date Stored in Unix format/ timestamp
                  );
                }}
              />
              <input
                type="email"
                required
                value={formValues.newEmail}
                placeholder="Email"
                pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                onChange={(event) => {
                  setNewEmail(event.target.value);
                }}
              />
              <input
                placeholder="Phone"
                required
                value={formValues.newPhone}
                onChange={(event) => {
                  setNewPhone(+event.target.value);
                }}
              />
              <input
                type="number"
                required
                value={formValues.newSalary}
                placeholder="Salary"
                onChange={(event) => {
                  setNewSalary(+event.target.value);
                }}
              />
              <div className="btns">
                <button
                  className="deleteBtn"
                  onClick={handleShowCreateEmployee}
                >
                  Exit
                </button>
                <button className="createBtn" onClick={createEmployee}>
                  Create
                </button>
              </div>
            </div>
          )}
          <table className="styled-table">
            <thead>
              <tr>
                <th>First name</th>
                <th>Last name</th>
                <th>Date of birth</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Salary</th>
                <th>/</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee, key) => {
                return (
                  <tr className="active-row" key={employee.id}>
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>
                      {new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }).format(employee.dob)}
                    </td>
                    <td>{employee.email}</td>
                    <td>{employee.phoneNumber}</td>
                    <td>{employee.salary}</td>
                    <td>
                      {!showEdit && (
                        <button onClick={handleShowEdit}>Edit</button>
                      )}
                      {/* {showEdit && (
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
                      )} */}
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