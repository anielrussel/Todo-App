import "./App.css";
import bgDark from "./assets/bg-desktop-dark.jpg";
import bgLight from "./assets/bg-desktop-light.jpg";
import mobileLight from "./assets/bg-mobile-light.jpg";
import mobileDark from "./assets/bg-mobile-dark.jpg";
import sun from "./assets/icon-sun.svg";
import moon from "./assets/icon-moon.svg";
import check from "./assets/icon-check.svg";
import cross from "./assets/icon-cross.svg";
import React, { useState, createContext } from "react";
import { motion } from "framer-motion";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("dark");
  const toggleTheme = () => {
    setTheme((curr) => (curr === "dark" ? "light" : "dark"));
  };

  const [toDo, setToDo] = useState([]);
  const [isIconVisible, setIsIconVisible] = useState(false);

  const [newTask, setNewTask] = useState("");

  //add task
  const addTask = () => {
    if (newTask) {
      let num = toDo.length + 1;
      let newEntry = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask("");
    }
  };

  //mark task done
  const markDone = (id) => {
    setIsIconVisible({ ...isIconVisible, [id]: !isIconVisible[id] });
    let newTask = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTask);
  };

  //delete task
  const deleteTask = (id) => {
    let newTasks = toDo.filter((task) => task.id !== id);
    setToDo(newTasks);
  };

  // Filter tasks based on the selected status
  const [selectedStatus, setSelectedStatus] = useState("all");
  const filteredTasks = toDo.filter((task) => {
    if (selectedStatus === "all") {
      return true;
    } else if (selectedStatus === "active") {
      return !task.status;
    } else {
      return task.status;
    }
  });

  // delete all completed task
  const clearCompletedTasks = () => {
    setToDo(toDo.filter((task) => !task.status));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <div className="app-bg">
          <img
            src={theme === "dark" ? bgDark : bgLight}
            alt=""
            className="bg-desktop"
          />
          <img
            src={theme === "dark" ? mobileDark : mobileLight}
            alt=""
            className="bg-mobile"
          />
        </div>
        <div className="app-container">
          <div className="app-container-top">
            <h1>TODO</h1>
            <img
              src={theme === "dark" ? sun : moon}
              alt=""
              onClick={toggleTheme}
            />
          </div>
          <div className="app-container-addtask">
            <div className="app-container-addtask-container">
              <span></span>
              <input
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                type={"text"}
                placeholder="Create a new todo..."
              />
            </div>
            <div className="button-task">
              {newTask !== "" && <button onClick={addTask}>Add todo</button>}
            </div>
          </div>

          {toDo && toDo.length ? (
            ""
          ) : (
            <h1 className="display-todo">Create a todo...</h1>
          )}
          {/* filter the task based on the buttton clicked - All, Active, Completed */}
          {filteredTasks.map((task, _) => {
            return (
              <React.Fragment key={task.id}>
                <motion.div
                  className="task-bg"
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ type: "tween", duration: 0.7 }}
                >
                  <div className={task.status ? "done" : ""}>
                    {isIconVisible[task.id] && <img src={check} alt="" />}
                    <span className="task-text">
                      <div
                        className="task-image"
                        onClick={(e) => markDone(task.id)}
                      ></div>
                      {task.title}
                    </span>
                  </div>
                  <div className="icons">
                    <img
                      src={cross}
                      alt=""
                      title="delete"
                      onClick={() => deleteTask(task.id)}
                    />
                  </div>
                </motion.div>
              </React.Fragment>
            );
          })}
          {toDo.length > 0 && (
            <div className="task-bg-bottom">
              <div className="task-bg-bottom-items">
                <p>
                  {toDo.filter((task) => task.status === false).length} items
                  left
                </p>
              </div>
              <div className="task-bg-bottom-buttons">
                <button
                  className={selectedStatus === "all" ? "button-active" : ""}
                  onClick={() => setSelectedStatus("all")}
                >
                  All
                </button>
                <button
                  className={selectedStatus === "active" ? "button-active" : ""}
                  onClick={() => setSelectedStatus("active")}
                >
                  Active
                </button>
                <button
                  className={
                    selectedStatus === "completed" ? "button-active" : ""
                  }
                  onClick={() => setSelectedStatus("completed")}
                >
                  Completed
                </button>
              </div>
              <div className="task-bg-bottom-clear">
                <button onClick={clearCompletedTasks}>Clear completed</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
