import React, { useEffect, useState } from 'react';
import { getTaskById } from '../../services/taskService';
import './TaskDetail.css';
import { useParams } from 'react-router-dom';

function TaskDetail({ token }) {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const task = await getTaskById(id, token);
        setTask(task);
      } catch (error) {
        setError('Failed to fetch task');
      }
    };

    fetchTask();
  }, [id, token]);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!task) {
    return <p>Loading...</p>;
  }

  return (
    <div className="task-detail">
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Created at: {new Date(task.created_at).toLocaleString()}</p>
      <p>Updated at: {new Date(task.updated_at).toLocaleString()}</p>
    </div>
  );
}

export default TaskDetail;