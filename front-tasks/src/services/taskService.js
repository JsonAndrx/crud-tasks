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