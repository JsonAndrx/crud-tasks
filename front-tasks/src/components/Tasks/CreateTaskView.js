import React from 'react';
import CreateTask from './CreateTask';
import { useTaskContext } from '../../context/TaskContext';

function CreateTaskView({ token }) {
  const { handleTaskCreated } = useTaskContext();

  return (
    <div className="create-task-view">
      <h2>Create a New Task</h2>
      <CreateTask token={token} onTaskCreated={handleTaskCreated} />
    </div>
  );
}

export default CreateTaskView;