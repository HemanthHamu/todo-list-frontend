import React, { useEffect, useState } from 'react';
import '../styles/task.css'
function Task({ task, onUpdate, onDelete, onToggle }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(task.text);

  const handleUpdate = () => {
    onUpdate(task._id, newText);
    setIsEditing(false);
  };

  return (
    <div className={`task ${task.done ? 'done' : ''}`} key={task.id}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
          />
          <button className='update-btn' onClick={handleUpdate}>Update</button>
          <button className="delete-btn" onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <div className="single-task-container">
          <span onClick={() => onToggle(task._id)}>{task.text}</span>
          <span className="timestamp">{new Date(task.timestamp).toLocaleString()}</span>
          <button className='edit-btn' onClick={() => setIsEditing(true)}>Edit</button>
          <button className='delete-btn' onClick={() => onDelete(task._id)}>
            Delete
          </button>
        </div>   
      )}
    </div>
  );
}

export default Task;
