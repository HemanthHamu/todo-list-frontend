import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';
import Footer from './components/Footer';

const API_URL = 'http://localhost:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState('');

  //THE logic inside this "useEffect" hook will send a request to backend route
  //which is responsible for sending all the available tasks which are stored in "MongoDB Atlas" database.
  //If user previously added any tasks then those tasks will be available in "tasks" state variable
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setTasks(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

 // THIS FUNCTION IS CALLED IF USER CLICKS ON ADD BUTTON
  const addTask = async (text) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
    } catch (err) {
      console.error(err);
    }
  };
 // THIS FUNCTION WILL BE CALLED IF USER CLICKS ON UPDATE BUTTON
  const updateTask = async (id, newText) => {
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: newText }),
      });
      const updatedTask = await response.json();
      setTasks(tasks.map(task => (task._id === id ? updatedTask : task)));
      toast.success("Todo Updated")
    } catch (err) {
      console.error(err);
    }
  };
 //THIS FUNCTION WILL BE CALLED IF USER CLICKS ON DELETE BUTTON
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, {
        method: 'DELETE',
      });
      setTasks(tasks.filter(task => task._id !== id));
      toast.success("Todo Deleted")
    } catch (err) {
      console.error(err);
    }
  };
  //THIS FUNCTION WILL BE CALLED IF USER CLICKS ON TODO
  const toggleTask = async (id) => {
    const task = tasks.find(task => task._id === id);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ done: !task.done }),
      });
      const updatedTask = await response.json();
      setTasks(tasks.map(task => (task._id === id ? updatedTask : task)));
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <>
    <div className="app">
      <h1>Todo List</h1>
      <input
      type="text"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      placeholder="Search tasks..."
      className='search-tasks'
    />
      <TaskForm onAdd={addTask} />
      <TaskList tasks={filteredTasks} onUpdate={updateTask} onDelete={deleteTask} onToggle={toggleTask}  />
      <Footer totalTodos={tasks}/>
      <Toaster />
    </div>
    </>
  );
}

export default App;
