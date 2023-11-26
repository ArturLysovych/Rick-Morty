import React, { useState, useEffect, ChangeEvent } from 'react';
import './css/WatchList.css';

interface ITask {
  id: number;
  text: string;
  completed: boolean;
}

const WatchList: React.FC = () => {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [newTask, setNewTask] = useState<string>('');

  useEffect(() => {
    const storedTaskJSON = localStorage.getItem('task') || '[]';
    const storedTask = JSON.parse(storedTaskJSON) as ITask[];
    setTasks(storedTask);
  }, []);

  useEffect(() => {
    localStorage.setItem('task', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (): void => {
    if (newTask.trim() !== '') {
      setTasks((prevTasks) => [
        ...prevTasks,
        {
          id: Date.now(),
          text: newTask,
          completed: false,
        },
      ]);
    }
  };

  const removeTask = (taskId: number): void => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const toggleComplete = (taskId: number): void => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  return (
    <div className='WatchList'>
      <h2>My watch list</h2>
      <div className='searchContainer'>
        <input
          type='text'
          placeholder='Add new episodes'
          value={newTask}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setNewTask(e.target.value);
          }}
        />
        <button onClick={addTask}>Add</button>
      </div>
      <ul className='listToWatch'>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type='checkbox'
              checked={task.completed}
              onChange={() => {
                toggleComplete(task.id);
              }}
            />
            <span className='taskName'>{task.text}</span>
            <button
              onClick={() => {
                removeTask(task.id);
              }}
              className='removeTask'
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WatchList;
