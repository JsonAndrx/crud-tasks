export const getTasks = async (token) => {
    const response = await fetch('http://localhost:8000/api/tasks', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
    if (!response.ok) {
      throw new Error('Failed to fetch tasks');
    }
    const data = await response.json();
    return data.data; // Extraer la lista de tareas del campo 'data'
  };

export const getTaskById = async (id, token) => {
  const response = await fetch(`http://localhost:8000/api/tasks/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  if (!response.ok) {
    throw new Error('Failed to fetch task');
  }
  const data = await response.json();
  return data.data;
};

export const deleteTask = async (id, token) => {
  const response = await fetch(`http://localhost:8000/api/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  if (!response.ok) {
    throw new Error('Failed to delete task');
  }
  return true;
};

export const createTask = async (task, token) => {
  const response = await fetch('http://localhost:8000/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(task),
  });
  console.log(response)
  if (!response.ok) {
    throw new Error('Failed to create task');
  }
  return true; // Extraer la tarea creada del campo 'data'
};