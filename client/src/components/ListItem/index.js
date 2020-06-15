import React, { useRef, useState, useEffect } from "react";
import "./listItem.css";
import { connect } from "react-redux";

const ListItem = (props) => {
//   const [task, setTask] = useState({task: "", completed: false, _id: ""});
//   const [allTasks, setAll] = useState([]);

//   const updateTasks = (latestAddition) => {
//     console.log("am i even getting", latestAddition);
//     const updatedTasks = [...allTasks, latestAddition];
//     console.log(updatedTasks);
//     setAll(allTasks => [...allTasks, latestAddition]);
//     return;
//   }

//   const addTask = async (e) => {
//     e.preventDefault();
//     const updatedUser = await API.addTask(task.task, task.completed, task._id);
//     console.log("updatedUser", updatedUser);
//     const updatedTodos = updatedUser.data.todos;
//     setAll(updatedTodos);
//     // const latestAddition = updatedTodos[updatedTodos.length - 1];
//     // console.log("trying to add: ", latestAddition);
//     // setAll([...allTasks, latestAddition]);
//     // updateTasks(latestAddition);
//     // console.log(allTasks);
//     return;
//   };{/* <ListItem task={task} completed={completed}/> */}

 
  

  return (
          <li> test </li>        
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(ListItem);
