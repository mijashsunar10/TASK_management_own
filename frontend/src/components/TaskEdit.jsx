import React, { useEffect, useState } from "react"; // Import React and Hooks: useState (state), useEffect (side effects)
import axios from "axios"; // For making HTTP requests to backend
import { FaPencilAlt } from "react-icons/fa"; // Import pencil icon from react-icons for edit button
import { toast, ToastContainer } from "react-toastify"; // For showing notifications
import "react-toastify/dist/ReactToastify.css"; // Import default styles for toast notifications


const BASE_URL = "http://localhost:5000/tasks"; // Backend API URL for tasks


function TaskEdit() {

  const [tasks, setTasks] = useState([]); // Stores all tasks fetched from backend
  const [editId, setEditId] = useState(null); // Stores the ID of the task currently being edited
  const [taskName, setTaskName] = useState(""); // Stores the current value of the task input field during edit 


//   Fetch the task

const fetchTasks = async() =>{
    const res = await axios.get(BASE_URL);
    setTasks(res.data.data);
};

useEffect(() => {
    fetchTasks();//// Fetch tasks once when component mounts
}, []);// Empty dependency array means this runs only onc

 // ----------------------------
  // START EDITING A TASK
  // ----------------------------
  const startEdit = (task) => {
    setEditId(task._id); // Save the ID of the task we want to edit
    setTaskName(task.taskName); // Pre-fill input field with current task name
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${BASE_URL}/${editId}`, { taskName }); 
      // Send PUT request to backend to update task with id = editId
      // Send the updated taskName in request body
      
      toast.success("Task updated successfully!"); // Show success notification
      setEditId(null); // Reset editId so input field hides
      setTaskName(""); // Clear input field
      fetchTasks(); // Refresh tasks list to show updated data
    } catch (err) {
      toast.error("Failed to update task."); // Show error notification if request fails
    }
  };

  return (
    <div className="text-center mt-5">
      <h2>Edit Task</h2>

      {/* Input field + update button appears only if a task is being edited */}
      {editId && (
        <div className="mt-3">
          <input
            type="text"
            className="form-control w-50 m-auto" // Bootstrap classes to center and style input
            value={taskName} // Bind input value to taskName state
            onChange={(e) => setTaskName(e.target.value)} // Update taskName as user types
          />
          <button className="btn btn-primary mt-2" onClick={handleUpdate}>
            Update
          </button>
        </div>
      )}

      {/* List all tasks */}
      <ul className="list-group w-50 m-auto mt-4">
        {tasks.map((task) => (
          <li key={task._id} className="list-group-item d-flex justify-content-between">
            <span>{task.taskName}</span> {/* Show task name */}
            {/* Edit button */}
            <button className="btn btn-sm btn-outline-primary" onClick={() => startEdit(task)}>
              <FaPencilAlt /> Edit {/* Pencil icon + label */}
            </button>
          </li>
        ))}
      </ul>

      {/* Toast notifications */}
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default TaskEdit;