import React, { useState } from 'react';
import { Task } from './types';
import { TaskItem } from './TaskItem';

export const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputTitle, setInputTitle] = useState<string>('');

  const addTask = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!inputTitle.trim()) return;
    const newTask: Task = { id: Date.now(), title: inputTitle.trim(), completed: false };
    setTasks(prev => [...prev, newTask]);
    setInputTitle('');
  };

  const fetchSampleTasks = (): void => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=3')
      .then(res => res.json())
      .then((data: any[]) => {
        const fetched: Task[] = data.map(item => ({
          id: item.id,
          title: item.title,
          completed: item.completed
        }));
        setTasks(prev => [...prev, ...fetched]);
      })
      .catch(err => console.error(err));
  };

  const toggleTask = (id: number): void => {
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const deleteTask = (id: number): void => {
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const total = tasks.length;
  const completed = tasks.reduce((acc, t) => (t.completed ? acc + 1 : acc), 0);
  const pending = tasks.filter(t => !t.completed).length;

  return (
    <div style={{ maxWidth: '480px', margin: '40px auto', fontFamily: 'Arial, sans-serif', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Student Task Manager</h2>
      <form onSubmit={addTask} style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
        <input
          type="text"
          value={inputTitle}
          onChange={e => setInputTitle(e.target.value)}
          placeholder="Enter task title..."
          style={{ flex: 1, padding: '8px' }}
        />
        <button type="submit" style={{ padding: '8px 12px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '4px' }}>Add</button>
      </form>
      <button onClick={fetchSampleTasks} style={{ width: '100%', padding: '8px', marginBottom: '16px', background: '#10b981', color: '#fff', border: 'none', borderRadius: '4px' }}>
        Fetch Sample Tasks
      </button>
      <div style={{ display: 'flex', justifyContent: 'space-between', background: '#f1f5f9', padding: '8px', borderRadius: '4px', marginBottom: '16px', fontSize: '0.9rem' }}>
        <span>Total: <strong>{total}</strong></span>
        <span>Completed: <strong>{completed}</strong></span>
        <span>Pending: <strong>{pending}</strong></span>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {tasks.map(task => (
          <TaskItem key={task.id} task={task} onToggle={toggleTask} onDelete={deleteTask} />
        ))}
      </ul>
    </div>
  );
};

export default App;