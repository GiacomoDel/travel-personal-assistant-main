'use client';

import React, { useState, createContext, useContext } from 'react';
import './AuthWrapper.css';

interface AuthContextType {
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext);

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'user@example.com' && password === 'pass123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    setError('');
  };

  if (!isAuthenticated) {
    return (
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleLogin}>
          <h2 className="auth-title">Iniciar Sesión</h2>

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="auth-input"
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="auth-input"
          />

          {error && <p className="auth-error">{error}</p>}

          <button type="submit" className="auth-button">Entrar</button>
        </form>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
