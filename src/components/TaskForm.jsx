import React, { useState } from 'react';
import '../styles/taskform.css'
import toast from 'react-hot-toast';
function TaskForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if(text===""){
      return toast.error("Please enter your task...")
    }
    if (text.trim()) {
      onAdd(text);
      toast.success('Task added')
      setText('');
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add new task"
      />
      <button className='add-button' type="submit">Add</button>
    </form>
  );
}

export default TaskForm;
