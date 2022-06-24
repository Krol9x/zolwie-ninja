import "./StudentView.css"
import React from "react"
import { useDB } from "../../contexts/DBContext"
import { useState, useEffect } from "react"
import Task from "../Task/Task";


export default function StudentView() {

  const { user, getUserTasks, submitSolution } = useDB()
  const [tasks, setTasks] = useState([])

  //pokaz taski z bazy

  const listItems = tasks.map((task) =>
      <Task key={task.date} name={task.name} description={task.description} feedback={task.feedback} dueDate={task.dueDate}>  </Task>
)

  async function getTasks() {
    setTasks(await getUserTasks(user.uid))
  }
  useEffect(() => {
    getTasks()
  }, [])



    return (
        <div className="xd">
      <ul>
        {listItems}
      </ul>
    </div>
  )
}