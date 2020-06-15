import React, { useRef, useState, useEffect } from "react";

import { connect } from "react-redux";

import API from "../../utils/API";

import ListItem from "../ListItem";

const ToDoList = (props) => {
  const [task, setTask] = useState({task: "", completed: false, _id: ""});
  const [allTasks, setAll] = useState([]);

  const updateTasks = (latestAddition) => {
    console.log("am i even getting", latestAddition);
    const updatedTasks = [...allTasks, latestAddition];
    console.log(updatedTasks);
    setAll(allTasks => [...allTasks, latestAddition]);
    return;
  }

  // useEffect(() => {
  //   const user = await API.getUser(pro

  //   // Removes listener on unmount
  //   return () => {
      
  //   };
  // }, []);

  const addTask = async (e) => {
    e.preventDefault();
    const updatedUser = await API.addTask(task.task, task.completed, task._id);
    console.log("updatedUser", updatedUser);
    const updatedTodos = updatedUser.data.todos;
    setAll(updatedTodos);
    // const latestAddition = updatedTodos[updatedTodos.length - 1];
    // console.log("trying to add: ", latestAddition);
    // setAll([...allTasks, latestAddition]);
    // updateTasks(latestAddition);
    // console.log(allTasks);
    return;
  };

 
  

  return (
    <div className="todoListMain">
      <div className="header">
        <form onSubmit={addTask}>
          <input
            onChange={(e) => setTask({task: e.target.value, completed: false, _id: props.user._id})}
            placeholder="enter task"
          ></input>
          <button type="submit">add</button>
          <ul>
          {allTasks.map((task) => (
                        <ListItem
                        
                        />
                    ))}
          </ul>
          
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(ToDoList);
