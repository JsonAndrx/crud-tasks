import React, { useState } from 'react';
import './App.css';
import LoginComp from './components/Login/LoginComp';
import { login } from './services/authService';

function App() {
  const [token, setToken] = useState(null);

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
          <p>Logged in with token: {token}</p>
        )}
      </main>
    </div>
  );
}

export default App;