import React from "react";
import "./statistics.scss";
import { db } from "../firebase-config";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { Employee } from "../entities";
import BarChart from "../components/BarChart";

export default function Statistics() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeeSalary, setEmployeeSalary] = useState({
    labels: ["name"],
    datasets: [
      {
        label: "Salary",
        data: [],
      },
    ],
  });

  const employeesCollectionRef = collection(db, "employees");

  useEffect(() => {
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

      const employeeSalaryData = {
        labels: employeesData.map(
          (employee) => `${employee.firstName} ${employee.lastName}`
        ),
        datasets: [
          {
            label: "Salary",
            data: employeesData.map((employee) => employee.salary),
          },
        ],
      };
      setEmployeeSalary(employeeSalaryData);
    };
    getEmployees();
  }, [employeesCollectionRef]);

  return (
    <div className="bar">
      <BarChart chartData={employeeSalary} />
    </div>
  );
}
