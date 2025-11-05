import { useState } from 'react'

import './App.css'
import TaskManager from './TaskManager'
import TaskCreate from './components/TaskCreate'
import TaskList from './components/TaskList'
import TaskEdit from './components/TaskEdit'
import TaskDelete from './components/TaskDelete'
import TaskSearch from './components/TaskSearch'
import TaskCreatee from './TaskCreatee'

function App() {


  return (
    <>
    {/* <TaskManager/> */}
    <TaskCreate/>
    <TaskList/>
    <TaskEdit/>
    <TaskDelete/>
    <TaskSearch/>
      <TaskManager/>
      <TaskCreatee/>
      {/* <TaskManager/> */}
    </>
  )
}

export default App
