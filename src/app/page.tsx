'use client';

import React, { useState } from 'react';
import Chat from '@/components/Chat';
import AuthWrapper from "../components/AuthWrapper";
import './styles/Layout.css';
import { useAuth } from '@/components/AuthWrapper';
export default function Home() {
  const [showLogout, setShowLogout] = useState(false);

  return (
    <AuthWrapper>
      <div className="main-container">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="sidebar-top">
            <div className="sidebar-option">Nueva Consulta</div>
            <div className="sidebar-option">Historial de Consultas</div>
            <div className="sidebar-suboption">Búsqueda 1</div>
            <div className="sidebar-suboption">Búsqueda 2</div>
          </div>
          <div className="sidebar-bottom">
            <img src="\images\smv.png" alt="Logo" className="logo" />
            <hr className="divider" />
          </div>
        </div>

        {/* Right Content */}
        <div className="right-section">
          {/* Navbar */}
          <nav className="navbar">
            <div className="user-section" onClick={() => setShowLogout(!showLogout)}>
              <span>Usuario</span>
              <div className="user-icon">👤</div>
              {showLogout && <button className="logout-button">Cerrar Sesión</button>}
            </div>
          </nav>
          {/* Main */}
          <main className="main-chat">
            <Chat />
          </main>
        </div>
      </div>
    </AuthWrapper>
  );
}
