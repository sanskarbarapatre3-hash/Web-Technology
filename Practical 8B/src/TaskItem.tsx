import React from 'react';
import { TaskItemProps } from './types';

export const TaskItem: React.FC<TaskItemProps> = ({ task, onToggle, onDelete }) => {
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />
      <span
        style={{
          textDecoration: task.completed ? 'line-through' : 'none',
          color: task.completed ? '#888' : '#000',
          flex: 1
        }}
      >
        {task.title}
      </span>
      <button onClick={() => onDelete(task.id)}>Delete</button>
    </li>
  );
};