import React, { useEffect, useState } from 'react';
import { getTasks } from '../../services/taskService';
import './TaskList.css';

function TasksList({ token }) {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await getTasks(token);
        setTasks(tasks);
      } catch (error) {
        setError('Failed to fetch tasks');
      }
    };

    fetchTasks();
  }, [token]);

  return (
    <div className="tasks-list">
      <h2>Tasks</h2>
      {error && <p className="error-message">{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{new Date(task.created_at).toLocaleString()}</td>
              <td>{new Date(task.updated_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TasksList;