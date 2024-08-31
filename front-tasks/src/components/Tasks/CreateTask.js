import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createTask } from '../../services/taskService';
import './CreateTask.css';

function CreateTask({ token, onTaskCreated }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending'); // Estado inicial
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newTask = await createTask({ title, description, status }, token);
      onTaskCreated(newTask);
      setTitle('');
      setDescription('');
      setStatus('pending'); // Reiniciar el estado
      navigate('/'); // Redirigir a la vista principal
    } catch (error) {
      console.error(error);
      setError('Failed to create task');
    }
  };

  return (
    <div className="create-task">
      <h2>Create Task</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label>Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
          </select>
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default CreateTask;