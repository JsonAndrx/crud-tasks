import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getTasks, updateTask } from '../../services/taskService';

function EditTaskView({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState({
    title: '',
    description: '',
    status: 'pending',
  });

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const fetchedTask = await getTasks(id, token);
        setTask(fetchedTask);
      } catch (error) {
        console.error('Failed to fetch task', error);
      }
    };

    fetchTask();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({
      ...prevTask,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateTask(id, task, token);
      navigate('/tasks');
    } catch (error) {
      console.error('Failed to update task', error);
    }
  };

  return (
    <div>
      <h2>Edit Task</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={task.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Status</label>
          <select
            name="status"
            value={task.status}
            onChange={handleChange}
            required
          >
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditTaskView;