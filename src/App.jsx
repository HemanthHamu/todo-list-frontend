import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import SearchBar from './components/SearchBar';
import './App.css';
import toast, { Toaster } from 'react-hot-toast';

const API_URL = 'http://localhost:5000/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [searchText, setSearchText] = useState('');

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
      gsap.fromTo(`.task-${id}`, { opacity: 0.5 }, { opacity: 1, duration: 0.5 });
    } catch (err) {
      console.error(err);
    }
  };

  const filteredTasks = tasks.filter(task => task.text.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <div className="app">
      <h1>Todo List</h1>
      <SearchBar searchText={searchText} onSearch={setSearchText} />
      <TaskForm onAdd={addTask} />
      <TaskList tasks={filteredTasks} onUpdate={updateTask} onDelete={deleteTask} onToggle={toggleTask} />
      <Toaster />
    </div>
  );
}

export default App;
