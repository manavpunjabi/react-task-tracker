import Header from "./components/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import About from "./components/About";
import AddTask from "./components/AddTask";

import { useState, useEffect } from "react";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false);
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter((task) => task.id !== id));
  };
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder };
    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: `PUT`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    });
    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !data.reminder } : task
      )
    );
  };
  const addTask = async (task) => {
    // const id = Math.floor(Math.random() * 10000 + 1);
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
    const res = await fetch(`http://localhost:5000/tasks`, {
      method: `POST`,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(task),
    });
    const data = await res.json();
    setTasks([...tasks, data]);
  };

  const fetchTasks = async () => {
    const res = await fetch(`http://localhost:5000/tasks`);
    const data = await res.json();
    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  };

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };
    getTasks();
  }, []);
  const [tasks, setTasks] = useState([]);
  return (
    <Router>
      <div className="container">
        {showAddTask && <AddTask onAdd={addTask} />}
        <Header
          onAdd={() => setShowAddTask(!showAddTask)}
          showAddTask={showAddTask}
        />

        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                `No Tasks to show.`
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
};

export default App;
