import React from 'react';
import Task from './Task';

function TaskList({ tasks, onUpdate, onDelete, onToggle }) {
  return (
    <div className="task-list">
      {tasks.map((task,index) => (
        <Task
          key={task.index}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

export default TaskList;
