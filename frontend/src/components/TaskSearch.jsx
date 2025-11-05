import React, { useEffect, useState } from "react"; 
// ✅ Import React and hooks:
// useState → to store component state (tasks list and search input)
// useEffect → to perform side effects like fetching data from backend

import axios from "axios"; 
// ✅ For making HTTP requests to the backend

import { FaSearch } from "react-icons/fa"; 
// ✅ Font Awesome search icon to display in input box

const BASE_URL = "http://localhost:5000/tasks"; 
// ✅ Backend API endpoint for fetching tasks

function TaskSearch() { 
  // ✅ Functional component declaration

  const [tasks, setTasks] = useState([]); 
  // ✅ State to store all tasks fetched from backend
  const [search, setSearch] = useState(""); 
  // ✅ State to store current search input value

   // ✅ Function to fetch all tasks from backend
  const fetchTasks = async () => {
    const res = await axios.get(BASE_URL); 
    // ✅ Send GET request to backend API to get all tasks
    setTasks(res.data.data); 
    // ✅ Save fetched tasks to the 'tasks' state
  };

// ✅ useEffect runs after the component mounts
  // ✅ Fetch tasks only once when component is loaded
  useEffect(() => {
    fetchTasks(); 
  }, []); 
  // ❌ Empty dependency array → run only once


    // ✅ Filter tasks based on search input
  const filtered = tasks.filter((task) =>
    task.taskName.toLowerCase().includes(search.toLowerCase())
  );
  // Explanation:
  // - Convert both task name and search input to lowercase for case-insensitive search
  // - Return only tasks whose name includes the search string

   return (
    <div className="text-center mt-5">
      {/* ✅ Main container, center text and add margin at top */}
      <h2>Search Tasks</h2> 
      {/* ✅ Header */}

      {/* ✅ Search input group */}
      <div className="input-group mt-3 w-50 m-auto">
        <span className="input-group-text">
          <FaSearch /> 
          {/* ✅ Search icon inside input box */}
        </span>
        <input
          className="form-control"
          type="text"
          placeholder="Search tasks..."
          value={search} 
          // ✅ Controlled component: value comes from 'search' state
          onChange={(e) => setSearch(e.target.value)} 
          // ✅ Update 'search' state whenever user types
        />
      </div>

      {/* ✅ List of filtered tasks */}
      <ul className="list-group w-50 m-auto mt-4">
        {filtered.map((task) => (
          <li key={task._id} className="list-group-item">
            {task.taskName} 
            {/* ✅ Display the task name */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskSearch; 
// ✅ Export component so it can be imported and used in App.js