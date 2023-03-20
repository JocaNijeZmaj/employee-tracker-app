import React from "react";
import "./statistics.scss";
import { db } from "../firebase-config";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Employee,  StatisticsData, Task } from "../entities";
import BarChart from "../components/BarChart";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import PolarChart from "../components/PolarChart";



export default function Statistics() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [employeeAllTasks, setEmployeeAllTasks] = useState<StatisticsData>({
    labels: ["name"],
    datasets: [
      {
        label: "Tasks",
        data: [],
      },
    ],
  });
  
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeSalary, setEmployeeSalary] = useState<StatisticsData>({
    labels: ["name"],
    datasets: [
      {
        label: "Salary",
        data: [],
      },
    ],
  });


  
  useEffect(() => {
    const employeesCollectionRef = collection(db, "employees");
    console.log('render')
    const getEmployees = async () => {
      const data = await getDocs(employeesCollectionRef);
      const employeesData = data.docs.map((doc) => {
        const employeeData = doc.data() as Employee;
        return {
          ...employeeData,
          id: doc.id,
        };
      });
      setEmployees(employeesData);
      console.log(employeesData);

      const employeeSalaryData: StatisticsData = {
        labels: employeesData.map(
          (employee) => `${employee.firstName} ${employee.lastName}`
        ),
        datasets: [
          {
            label: "Salary",
            data: employeesData.map((employee) => employee.salary),
            backgroundColor: ["#90EE90", "#7FFFD4", "#AFE1AF", "#50C878"],
          },
        ],
      };
      setEmployeeSalary(employeeSalaryData);
    };
    getEmployees();
  }, []);
  
  useEffect(() => {
    const taskCollectionRef = collection(db, "tasks");

    const getTasks = async () => {
      const data = await getDocs(taskCollectionRef);
      const taskData = data.docs.map((doc) => {
        const taskData = doc.data() as Task;
        return {
          ...taskData,
          id: doc.id,
        };
      });
      setTasks(taskData);
      console.log(taskData);

      // Calculate task statistics
      const assignCounts: { [assign: string]: number } = {};
      taskData.forEach((task) => {
        if (!assignCounts[task.assign]) {
          assignCounts[task.assign] = 0;
        }
        assignCounts[task.assign]++;
      });
      const taskStatisticsData: StatisticsData = {
        labels: Object.keys(assignCounts),
        datasets: [
          {
            label: "Number of tasks",
            data: Object.values(assignCounts),
            backgroundColor: ["#90EE90", "#7FFFD4", "#AFE1AF", "#50C878"],
          },
        ],
      };
      setEmployeeAllTasks(taskStatisticsData);
    };

    console.log("render");
    getTasks();
  }, []);


  return (
    <div className="statistics">
      <h2>
        Employee salary range:
        <BarChart chartData={employeeSalary} />
      </h2>
      <h2>
        Employee salary line:
        <LineChart chartData={employeeSalary} />
      </h2>
      <h2>
        Employee salary range:
        <PieChart chartData={employeeSalary} />
      </h2>
      <h2>
        All employee tasks
        <PolarChart chartData={employeeAllTasks} />
      </h2>
    </div>
  );
}
