import React from 'react'
import { useState, useEffect } from 'react'
import  { db }  from "../firebase-config";
import { collection, getDocs , addDoc, updateDoc, doc, deleteDoc} from "firebase/firestore"
import "./manage-employees.scss";
import { Employee } from '../entities';


export default function ManageEmployees() {

    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newDob, setNewDob] = useState(0)
    const [newPhone, setNewPhone] = useState(0)
    const [newEmail, setNewEmail] = useState("");
    const [newSalary, setNewSalary] = useState(0);

    const [employees, setEmployees] = useState<Employee[]>([]);

    const [editFirstName, setEditFirstName] = useState('');
    const [editLastName, setEditLastName] = useState("");
    const [editDob, setEditDob] = useState(0);
    const [editPhone, setEditPhone] = useState(0);
    const [editEmail, setEditEmail] = useState("");
    const [editSalary, setEditSalary] = useState(0);

    

    let [showCreateEmployee, setShowCreateEmployee] = useState(false);
    let [showEdit, setShowEdit] = useState(false);
    const employeesCollectionRef = collection(db, "employees")
    const [isDisabled, setIsDisabled] = useState(true);

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

        const someSmallValidation = (event:  React.ChangeEvent<HTMLInputElement>) => {
          setNewLastName(event.target.value);
          if (event.target.value.trim().length < 1) {
            setIsDisabled(true);
          } else {
            setIsDisabled(false);
          }
        };

        //edit employee

      const updateEmployee = async (id: string ) => {
            handleShowEdit();
            setEmployees(
              employees.map((employee) => {
                return employee.id === id
                  ? {
                      firstName: editFirstName,
                      lastName: editLastName,
                      email: editEmail,
                      phoneNumber: editPhone,
                      dob: editDob,
                      salary: editSalary,
                    }
                  : employee;
              })
            );
        const employeeDoc = doc(db, "employees", id);
        const updatedEmployee = {
          firstName: editFirstName,
          lastName: editLastName,
          email: editEmail,
          phoneNumber: editPhone,
          dob: editDob,
          salary: editSalary,
        };
        await updateDoc(employeeDoc, updatedEmployee);
      };

      const handleShowEdit = () => {
        setShowEdit((current) => !current);
      }

      const deleteEmployee =  async (id: string) => {
        const employeeDoc = doc(db, "employees", id);
        setEmployees(
        employees.filter((val) => {
          return val.id != id;}))
        await deleteDoc(employeeDoc);
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
                onChange={(event) => {
                  someSmallValidation(event);
                }}
              />
              <input
                placeholder="Last name"
                required
                onChange={(event) => {
                  setNewFirstName(event.target.value);
                }}
              />
              <input
                type="date"
                required
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
                placeholder="Email"
                pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
                onChange={(event) => {
                  setNewEmail(event.target.value);
                }}
              />
              <input
                placeholder="Phone"
                required
                onChange={(event) => {
                  setNewPhone(+event.target.value);
                }}
              />
              <input
                type="number"
                required
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
                <button
                  className="createBtn"
                  disabled={isDisabled}
                  onClick={createEmployee}
                >
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
                    <td>
                      {!showEdit && employee.firstName}
                      {showEdit && (
                        <input
                          type="text"
                          placeholder={employee.firstName}
                          onChange={(event) => {
                            setEditFirstName(event.target.value);
                          }}
                        />
                      )}
                    </td>

                    <td>
                      {!showEdit && employee.lastName}
                      {showEdit && (
                        <input
                          type="text"
                          placeholder={employee.lastName}
                          onChange={(event) => {
                            setEditLastName(event.target.value);
                          }}
                        />
                      )}
                    </td>

                    <td>
                      {!showEdit &&
                        new Intl.DateTimeFormat("en-US", {
                          year: "numeric",
                          month: "2-digit",
                          day: "2-digit",
                        }).format(employee.dob)}
                      {showEdit && (
                        <input
                          type="date"
                          onChange={(event) => {
                            setEditDob(new Date(event.target.value).getTime());
                          }}
                        />
                      )}
                    </td>
                    <td>
                      {!showEdit && employee.email}
                      {showEdit && (
                        <input
                          type="email"
                          placeholder={employee.email}
                          onChange={(event) => {
                            setEditEmail(event.target.value);
                          }}
                        />
                      )}
                    </td>
                    <td>
                      {!showEdit && employee.phoneNumber}
                      {showEdit && (
                        <input
                          type="text"
                          placeholder="phone"
                          onChange={(event) => {
                            setEditPhone(+event.target.value);
                          }}
                        />
                      )}
                    </td>
                    <td>
                      {!showEdit && employee.salary}
                      {showEdit && (
                        <input
                          type="text"
                          placeholder="new salary"
                          onChange={(event) => {
                            setEditSalary(+event.target.value);
                          }}
                        />
                      )}
                    </td>
                    <td>
                      {!showEdit && (
                        <button className="createBtn" onClick={handleShowEdit}>
                          Edit
                        </button>
                      )}
                      {showEdit && (
                        <div>
                          <div>
                            <button
                              className="createBtn"
                              onClick={() => {
                                updateEmployee(employee.id as string);
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
                        </div>
                      )}
                      {!showEdit && (
                        <button
                          className="deleteBtn"
                          onClick={() => {
                            deleteEmployee(employee.id as string);
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