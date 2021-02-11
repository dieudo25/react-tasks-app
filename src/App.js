import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
import About from "./components/About";
// To use state inside of a function we use a hooks called useState
// useEffect is used to create a side effect when something happen,
// like when a page finish loading
import { useState, useEffect } from "react";

function App() {
  // Hook USESTATE
  // [stateNameVariable, functionToUpdateTheState] = useState(defaultState)
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      setTasks(tasksFromServer);
    };

    getTasks();
  }, []);

  // Async fonciton that fetch tasks from JSON Server
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/tasks");
    const data = await res.json();

    return data;
  };

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();

    return data;
  };

  // Add Task
  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      // When add Data you need to spécify contentTypes
      headers: {
        "Content-Type": "application/json",
      },
      // Data that are send in this case task
      // JSON.stringify => turn from a js object to a JSON String
      body: JSON.stringify(task),
    });

    const data = await res.json();
    setTasks([...tasks, data]);

    /* const id = Math.floor(Math.random() * 10000) + 1;

    // Spread Operator add id to task object as a properties
    const newTask = { id, ...task };
    // Spread operator setTask with the already existing tasks array and add the new task to it
    setTasks([...tasks, newTask]); */
  };
  // Delete Task
  const deleteTask = async (id) => {
    // Fetch the task to delete with the unique id
    // take as a second argument an object with the method of the request in this case it is DELETE
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "DELETE",
    });

    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToogle = await fetchTask(id);
    const updatedTask = { ...taskToToogle, reminder: !taskToToogle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTask),
    });

    const data = await res.json();

    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !data.reminder } : task
      )
    );
  };

  return (
    <Router>
      <div /* style={headingStyle} */ className="container">
        <Header
          showAdd={showAddTask}
          onAdd={() => setShowAddTask(!showAddTask)}
        />
        {/* If showAddTask is true then show the components AddTask
        A way to do the ternary without the else */}
        <Route
          path="/"
          exact
          render={(props) => (
            <>
              {showAddTask && <AddTask onAdd={addTask} />}
              {tasks.length > 0 ? (
                <Tasks
                  tasks={tasks}
                  onDelete={deleteTask}
                  onToggle={toggleReminder}
                />
              ) : (
                "No tasks to show"
              )}
            </>
          )}
        />
        <Route path="/about" component={About} />
        <Footer />
      </div>
    </Router>
  );
}

//Inject style via JS, great for dynamics css
/* const headingStyle = {
  color: 'red',
  backgroundColor : 'black'
} */

export default App;
