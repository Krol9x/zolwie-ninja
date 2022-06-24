import "./TeacherView.css";
import React from "react";
import { useDB } from "../../contexts/DBContext.js";
import { useState, useEffect } from "react";
import TeacherTask from "../TeacherTask/TeacherTask";
import { list } from "firebase/storage"

export default function TeacherView() {
  const [x, setX] = useState(1);
  const { user, getGroupInfo, addTask, getUserGroups } = useDB();

  const [isShown, setIsShown] = useState(false); // wyswietla dodawanie zadania
  const handleClick = event => { setIsShown(current => !current); }; // wyswietla dodawanie zadania


  const [teacherGroups, setTeacherGroups] = useState()
  const [teacherTasks, setTeacherTasks] = useState([{
    name: "Zadanie 1",
    description: "asd",
    end_date: "dzi "
  },
  {
    name: "Zadanie 2",
    description: "jedz zupe",
    end_date: "jutro"
  },])

  /* const [isReplies, setIsReplies] = useState(false); */



  const tasksTeach = [{
    name: "Zadanie 1",
    description: "Olicz pole kola",
    end_date: "jutro ",
    date: "22.04.2022",
    user: "Jan Kowalski"
  }, {
    name: "Zadanie 2",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras leo dolor, posuere vel orci eu, gravida pellentesque libero. Donec efficitur, libero sit amet ornare convallis, felis mauris congue nibh, id vestibulum sem mauris et ligula. Phasellus sagittis elementum elit eu placerat. Curabitur consequat nisl tortor, vel consectetur tellus efficitur ac. Pellentesque in quam odio. In eu risus efficitur, faucibus diam nec, facilisis velit. Pellentesque interdum sem ultrices neque pretium, ut aliquet metus lacinia. Sed dictum dui et nisi varius dapibus. Etiam id tincidunt ante, sed egestas tellus. Cras a bibendum eros. Morbi pretium diam ut nisi aliquam interdum. ",
    end_date: "dzis ",
    date: "22.08.2022",
    user: "Tom Kowalski"
  }];

  const groups = [{ grupa: "Grupa 1", id: "1" }, { grupa: "Grupa 2", id: "2" }];
  const listItems = groups.map((group) =>
    <li><button key={group.id} className="group-btn" onClick={() => setX(group.id)}>{group.grupa}</button></li>
  );

  let listTasks = tasksTeach.map((task) =>
    <TeacherTask key={task.date} name={task.name} end_date={task.end_date} desc={task.description} user={task.user} date={task.date}></TeacherTask>
  )


  useEffect(() => {
    listTasks = teacherTasks.map((task) =>
      <TeacherTask key={task.date} name={task.name} desc={task.description} end_date={task.dueDate}></TeacherTask>
    )
  }, [teacherTasks])

  //pokaz taski z bazy

  async function initData() {
    const groups = await getUserGroups(user.uid)

    let groupInfoReturn = [];
    let tasksReturn = [];
    for (let group in groups) {
      group = groups[group]
      const groupInfo = await getGroupInfo(group)
      groupInfoReturn[group] = groupInfo.name

      Object.keys(groupInfo.tasks).forEach(key => {
        tasksReturn[key] = groupInfo.tasks[key]
      })
    }
    console.log("groupInfoReturn", groupInfoReturn);
    console.log("tasksReturn", tasksReturn);

    setTeacherGroups(groupInfoReturn)
    setTeacherTasks(tasksReturn)
  }

  useEffect(() => {
    initData()
  }, [])
  // // Update task info after getting teacher groups


  return (
    <div className="mainview">
      <div className="groups">
        <ul>
          {listItems}
        </ul>
      </div>
      <div className="tasks">

        <div className="groupname"> Grupa {x}</div>
        <button className="addassingment" onClick={handleClick} >Dodaj Zadanie</button>
        {isShown && (
          <div className="addAssingmentPop">
            <form>
              <input type="text" className="addassingmentPopName" placeholder="Nazwa Zadania" required></input>
              <textarea type="text" className="addassingmentPopDesc" placeholder="Opis Zadania" required></textarea>
              <button className="addassingmentPopBtn" onClick={handleClick}>Dodaj Zadanie</button>
              <div className="addassingmentPopDate"><input type="date" id="end_date" name="end_date"></input></div>
            </form>
          </div>)}

        <div className="assingments" id="assingments">
          {listTasks}
        </div>

      </div>
    </div>
  );
}