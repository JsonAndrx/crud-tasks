export const login = async (credentials) => {
    const response = await fetch('http://localhost:8000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (data.status && data.data && data.data.token) {
      return data.data.token;
    } else {
      throw new Error('Login failed');
    }
  };