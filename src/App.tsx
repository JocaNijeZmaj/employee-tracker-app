import { useState } from 'react'
import './App.scss'
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import ManageEmployees from './pages/manage-employees';
import ManageTasks from './pages/manage-tasks';
import Statistics from './pages/statistics';
import Home from './pages/home';
import logo from './assets/images/private-detective.png';


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>Employee Tracker 4000</h1>
          <img src={logo} className='logo' />
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="employees">Manage employees</NavLink>
            <NavLink to="tasks">Manage tasks</NavLink>
            <NavLink to="statistics">Statistics</NavLink>
          </nav>
        </header>
        <main>
          <Routes>
            <Route index element={<Home />} />
            <Route path="employees" element={<ManageEmployees />} />
            <Route path="tasks" element={<ManageTasks />} />
            <Route path="statistics" element={<Statistics />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App
