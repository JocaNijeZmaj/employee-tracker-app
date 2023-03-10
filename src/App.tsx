import { useState } from 'react'
import './App.scss'
import Leaderboard from './components/leaderboard';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ManageEmployees from './pages/manage-employees';
import ManageTasks from './pages/manage-tasks';


function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <div className="App">
        <header>
          <h1>Employee Tracker 4000</h1>
          <img className="logo" src="src\assets\private-detective.png" />
        </header>
        <main>
          <Leaderboard />
          <Routes>
            <Route path="employees" element={<ManageEmployees />} />
            <Route path="tasks" element={<ManageTasks />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App
