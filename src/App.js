import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import AddTask from "./components/AddTask";
// To use state inside of a function we use a hooks called state
import { useState } from "react";

function App() {
  // Hook USESTATE
  // [stateNameVariable, functionToUpdateTheState] = useState(defaultState)
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: "Doctors Appointement",
      day: "25 février à 12:00",
      reminder: true,
    },
    {
      id: 2,
      text: "Meeting at School",
      day: "3 mai à 08:00",
      reminder: true,
    },
    {
      id: 3,
      text: "Food Shopping",
      day: "12 février à 20:00",
      reminder: false,
    },
  ]);

  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000) + 1;

    // Spread Operator add id to task object as a properties
    const newTask = { id, ...task };
    // Spread operator setTask with the already existing tasks array and add the new task to it
    setTasks([...tasks, newTask]);
  };
  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Toggle Reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, reminder: !task.reminder } : task
      )
    );
  };

  return (
    <div /* style={headingStyle} */ className="container">
      <Header
        showAdd={showAddTask}
        onAdd={() => setShowAddTask(!showAddTask)}
      />
      {/* If showAddTask is true then show the components AddTask
      A way to do the ternary without the else */}
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder} />
      ) : (
        "No tasks to show"
      )}
    </div>
  );
}

//Inject style via JS, great for dynamics css
/* const headingStyle = {
  color: 'red',
  backgroundColor : 'black'
} */

export default App;
