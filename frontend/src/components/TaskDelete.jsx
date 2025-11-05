import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaTrash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BASE_URL = "http://localhost:5000/tasks";

function TaskDelete() {
  const [tasks, setTasks] = useState([]); // State to store all fetched tasks (initially empty array)


  const fetchTasks = async () => {
    const res = await axios.get(BASE_URL); //GET request to backend to fetch all tasks
    setTasks(res.data.data); //save fetched tasks into 'tasks' state
  };

     // useEffect is a React Hook that runs side effects in components.
      // Here we use it to call fetchTasks() when the component first renders.

  useEffect(() => {
    fetchTasks();
  }, []);

  

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;

    try {
      await axios.delete(`${BASE_URL}/${id}`);
      toast.success("Task deleted successfully!");
      fetchTasks();
    } catch (err) {
      toast.error("Failed to delete task.");
    }
  };

  return (
    <div className="text-center mt-5">
      <h2>Delete Task</h2>

      <ul className="list-group w-50 m-auto mt-4">
        {tasks.map((task) => (
          <li key={task._id} className="list-group-item d-flex justify-content-between">
            <span>{task.taskName}</span>
            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task._id)}>
              <FaTrash /> Delete
            </button>
          </li>
        ))}
      </ul>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default TaskDelete;
