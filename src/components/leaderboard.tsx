import React from 'react';
import './leaderboard.scss';
import { useState, useEffect } from "react";
import { collection, getDocs , addDoc, updateDoc, doc, deleteDoc} from "firebase/firestore"
import { Task } from '../entities';
import { db } from "../firebase-config";



export default function Leaderboard() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const taskCollectionRef = collection(db, "tasks");
    const [topEmployees, setTopEmployees] = useState<[]>([]);


    useEffect(() => {
      const getTasks = async () => {
        const data = await getDocs(taskCollectionRef);
        setTasks(
          data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as Task))
        );
      };
      getTasks();
    }, []);

useEffect(() => {
  setTopEmployees(
    tasks
      .map((task) => task.assign)
      .flat()
      .reduce((name: any , assignee) => {
        name[assignee] = (name[assignee] || 0) + 1;
        return name;
      }, {}) 
      );
      console.log(topEmployees)
}, [tasks]);


  return (
    <div className="leaderboard">
      <h2>Leaderbord</h2>
      {Object.entries(topEmployees)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 5)
        .map(([assignee, count]) => (
          <p key={assignee}>
            {assignee}: {count} tasks
          </p>
        ))}
    </div>
  );
}
