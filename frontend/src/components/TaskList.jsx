import React, { useEffect, useState } from 'react';

import axios from "axios"; // ✅ For API calls

const BASE_URL = "http://localhost:5000/tasks"; // backend route

function TaskList()
{
    const [tasks,setTasks]=useState([]); // to store fetched tasks

    // This async function calls our backend API to get all tasks.
    const fetchTasks = async () => {
        try {
            const res = await axios.get(BASE_URL); /// Send a GET request to the backend URL 
            // await → waits for the request to finish before moving to the next line.

            // // Once data is received, we store it in the 'tasks' state.
      // Assuming the API returns data in this format: { data: { data:: [...] } }
      // res → the whole message from the server
    // res.data → the main content of that message
    // res.data.data → the list of your tasks
    // setTasks(...) → save that list in your app
            setTasks(res.data.data); // save fetched tasks to state
        } catch (err) {
            console.error(err);
            // handle error, e.g., show a notification
        }
    };

    //   // useEffect is a React Hook that runs side effects in components.
      // Here we use it to call fetchTasks() when the component first renders.

    useEffect(() => {
        fetchTasks(); // fetch tasks all when component mounts
    }, []); //// Empty dependency array [] means this will only run once 

  return (
    <div className="mt-5 text-center">
      <h2>All Tasks</h2>

      <ul className="list-group mt-3 w-50 m-auto">
        {/* tasks → is your array of task objects, stored in state from before (using setTasks). */}
        {/* .map() → is a JavaScript function that loops through every item in an array and returns something for each one */}
        {tasks.map((task) => (
          <li key={task._id} className="list-group-item d-flex justify-content-between">
            <span>{task.taskName}</span>
            <span>{task.isDone ? "✅ Done" : "⏳ Pending"}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;