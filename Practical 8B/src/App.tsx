import React, { useState } from 'react';
import { Task } from './types';
import { TaskItem } from './TaskItem';

export const App: React.FC = () => {
  // Explicitly typed state
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: 'Learn TypeScript interfaces', completed: true },
    { id: 2, title: 'Build React component with props', completed: false }
  ]);
  const [inputTitle, setInputTitle] = useState<string>('');

  // Add Task handler
  const handleAddTask = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!inputTitle.trim()) return;

    const newTask: Task = {
      id: Date.now(),
      title: inputTitle.trim(),
      completed: false
    };

    setTasks((prevTasks: Task[]) => [...prevTasks, newTask]);
    setInputTitle('');
  };

  // Toggle Task completion (using map)
  const handleToggle = (id: number): void => {
    setTasks((prevTasks: Task[]) =>
      prevTasks.map((task: Task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete Task (using filter)
  const handleDelete = (id: number): void => {
    setTasks((prevTasks: Task[]) => prevTasks.filter((task: Task) => task.id !== id));
  };

  return (
    <div style={{ maxWidth: '420px', margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>React + TypeScript To-Do App</h2>

      <form onSubmit={handleAddTask} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <input
          type="text"
          value={inputTitle}
          placeholder="Enter a task..."
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputTitle(e.target.value)}
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 16px' }}>Add</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task: Task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onDelete={handleDelete}
          />
        ))}
      </ul>

      <p style={{ marginTop: '16px', fontSize: '0.9rem', color: '#555' }}>
        Total: {tasks.length} | Completed: {tasks.filter((t: Task) => t.completed).length}
      </p>
    </div>
  );
};

export default App;