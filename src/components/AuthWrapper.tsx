'use client';

import React, { useState, createContext, useContext, useEffect } from 'react';
import './AuthWrapper.css';

interface AuthContextType {
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthWrapper');
  }
  return context;
};

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Al cargar el componente, verificamos si ya hay una sesión
  useEffect(() => {
    const auth = sessionStorage.getItem('authenticated');
    setIsAuthenticated(auth === 'true');
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'user@example.com' && password === 'pass123') {
      sessionStorage.setItem('authenticated', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Credenciales incorrectas');
    }
  };

  const logout = () => {
    sessionStorage.removeItem('authenticated');
    setIsAuthenticated(false);
    setEmail('');
    setPassword('');
    setError('');
  };

  // Mientras verifica sesión, no muestra nada
  if (isAuthenticated === null) return null;

  // Si no está autenticado, muestra login
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

  // Si está autenticado, muestra la app
  return (
    <AuthContext.Provider value={{ logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthWrapper;
