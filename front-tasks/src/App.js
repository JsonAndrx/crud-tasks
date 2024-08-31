import React, { useState, useEffect } from 'react';
import './App.css';
import LoginComp from './components/Login/LoginComp';
import TasksList from './components/Tasks/TaskListComp';
import { login } from './services/authService';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const handleLogin = async (credentials) => {
    try {
      const token = await login(credentials);
      setToken(token);
      console.log('Token:', token);
    } catch (error) {
      throw new Error('Login failed');
    }
  };

  return (
    <div className="App">
      <main>
        {!token ? (
          <LoginComp onLogin={handleLogin} />
        ) : (
          <TasksList token={token} />
        )}
      </main>
    </div>
  );
}

export default App;