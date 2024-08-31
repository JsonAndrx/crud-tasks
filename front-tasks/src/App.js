import React, { useState, useEffect } from 'react';
import './App.css';
import LoginComp from './components/Login/LoginComp';
import TasksList from './components/Tasks/TaskListComp';
import TaskDetail from './components/Tasks/TaskDetail';
import { login } from './services/authService';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

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
    <Router>
      <div className="App">
        <main>
          <Routes>
            <Route path="/" element={!token ? <LoginComp onLogin={handleLogin} /> : <Navigate to="/tasks" />} />
            <Route path="/tasks" element={token ? <TasksList token={token} /> : <Navigate to="/" />} />
            <Route path="/tasks/:id" element={token ? <TaskDetail token={token} /> : <Navigate to="/" />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;