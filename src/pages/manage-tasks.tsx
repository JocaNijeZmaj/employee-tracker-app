import React from 'react'
import  { db }  from "../firebase-config";
import { useState, useEffect } from "react";
import { collection, getDocs , addDoc, updateDoc, doc, deleteDoc} from "firebase/firestore"
import { Employee, Task } from "../entities";
import "./manage-tasks.scss";



export default function ManageTasks() {

    const [newTitle, setNewTitle] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newAssign, setNewAssign ]= useState("");
    const [newDueDate, setNewDueDate] = useState(0);
    const [newIsDone, setNewEmail] = useState(false);

    const [tasks, setTasks] = useState<Task[]>([]);

    const [editTitle, setEditTitle] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editAssign, setEditAssign] = useState("");
    const [editDueDate, setEditDueDate] = useState(0);
    const [editIsDone, setEditIsDone] = useState(false);

    const [employeeNames, setEmployeeNames] = useState<Employee[]>([])
    let [showCreateTask, setShowCreateTask] = useState(false);
    let [showEdit, setShowEdit] = useState(false);
    const taskCollectionRef = collection(db, "tasks");
    const employeesCollectionRef = collection(db, "employees")

    //getting all the tasks
    useEffect(() => {
      const getTasks = async () => {
        const data = await getDocs(taskCollectionRef);
        setTasks(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Task))
        );
        console.log(data);
      };
      getTasks();
    }, []);

    useEffect(() => {
        const getEmployees = async () => {
            const data = await getDocs(employeesCollectionRef);
            setEmployeeNames(
              data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Employee))
            );
            console.log(data)
        }
        getEmployees()
    }, [])

    // creating Task
    const handleShowCreateTask = () => {
      setShowCreateTask((current) => !current);
    };

    const createTask = async () => {
      await addDoc(taskCollectionRef, {
        title: newTitle,
        description: newDescription,
        assign: newAssign,
        dueDate: newDueDate,
        isDone: newIsDone
      });
      setTasks([
        ...tasks,
        {
          title: newTitle,
          description: newDescription,
          assign: newAssign,
          dueDate: newDueDate,
          isDone: newIsDone
        },
      ]);
      handleShowCreateTask();
    };


    //edit task

    const updateTask = async (id: string) => {
      const task = tasks.find((task) => task.id === id);
      if (
        task?.title === editTitle &&
        task.description === editDescription &&
        task.assign === editAssign &&
        task.dueDate === editDueDate &&
        task.isDone === editIsDone
      ){
        console.log("No changes made");
        return;
      }

      handleShowEdit();
      setTasks(
        tasks.map((task) => {
          return task.id === id
            ? {
                title: editTitle,
                description: editDescription,
                assign: editAssign,
                dueDate: editDueDate,
                isDone: editIsDone,
              }
            : task;
        })
      );
      const taskDoc = doc(db, "tasks", id);
      const updatedTasks = {
        title: editTitle || task?.title,
        description: editDescription || task?.description,
        assign: editAssign || task?.assign,
        dueDate: editDueDate || task?.dueDate,
        isDone: editIsDone || task?.isDone,
      };
      await updateDoc(taskDoc, updatedTasks);
    };

    const handleShowEdit = () => {
      setShowEdit((current) => !current);
    };

    const deleteTask = async (id: string) => {
      const taskDoc = doc(db, "tasks", id);
      setTasks(
        tasks.filter((val) => {
          return val.id != id;
        })
        );
        await deleteDoc(taskDoc);
    };


  return (
    <div>
      <div className="taskButton">
        {!showCreateTask && (
          <button className="createBtn" onClick={handleShowCreateTask}>
            Create Task
          </button>
        )}
        {showCreateTask && (
          <div className="createEmployeeBox">
            <input
              placeholder="Title"
              required
              onChange={(event) => {
                setNewTitle(event.target.value);
              }}
            />
            <input
              placeholder="Description"
              required
              onChange={(event) => {
                setNewDescription(event.target.value);
              }}
            />
            <label htmlFor="assign">Assign to</label>
            <select
              name="assign"
              id="assign"
              onChange={(event) => {
                setNewAssign(event.target.value);
              }}
            >
              {employeeNames.map((name) => {
              return <option key={name.id} value={name.firstName}>{name.firstName}</option>;})}
            </select>
            <input
              type="date"
              required
              placeholder="dueDate"
              onChange={(event) => {
                setNewDueDate(
                  new Date(event.target.value).getTime()
                );
              }}
            />
            <div className="btns">
              <button className="deleteBtn" onClick={handleShowCreateTask}>
                Exit
              </button>
              <button
                className="createBtn"
                onClick={createTask}
              >
                Create
              </button>
            </div>
          </div>
        )}
        <table className="styled-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Assign to</th>
              <th>Due date</th>
              <th>Status</th>
              <th>/</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, key) => {
              return (
                <tr className="active-row" key={task.id}>
                  <td>
                    {!showEdit && task.title}
                    {showEdit && (
                      <input
                        type="text"
                        placeholder={task.title}
                        onChange={(event) => {
                          setEditTitle(event.target.value);
                        }}
                      />
                    )}
                  </td>
                  <td>
                    {!showEdit && task.description}
                    {showEdit && (
                      <input
                        type="text"
                        placeholder={task.description}
                        onChange={(event) => {
                          setEditDescription(event.target.value);
                        }}
                      />
                    )}
                  </td>
                  <td>
                    {!showEdit && task.assign}
                    {showEdit && (
                      <select
                        name="assign"
                        id="assign"
                        onChange={(event) => {
                          setEditAssign(event.target.value);
                        }}
                      >
                        {employeeNames.map((name, key) => {
                          return (
                            <option key={name.id}>{name.firstName}</option>
                          );
                        })}
                      </select>
                    )}
                  </td>
                  <td>
                    {!showEdit &&
                      new Intl.DateTimeFormat("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                      }).format(task.dueDate)}
                    {showEdit && (
                      <input
                        type="date"
                        onChange={(event) => {
                          setEditDueDate(
                            new Date(event.target.value).getTime()
                          );
                        }}
                      />
                    )}
                  </td>
                  <td>
                    {!showEdit &&
                      (task.isDone === true ? "Done" : "Not Finished")}
                    {showEdit && (
                      <input
                        checked={editIsDone}
                        type="checkbox"
                        onChange={(event) => {
                          setEditIsDone(event.target.checked);
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
                              updateTask(task.id as string);
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
                          deleteTask(task.id as string);
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