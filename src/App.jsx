import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import TransactionsPage from './pages/TransactionsPage';
import NewTransactionPage from './pages/NewTransactionPage';
import EditTransactionPage from './pages/EditTransactionPage';
import tenpoLogo from './assets/images/tenpo-logo.svg'; // Importa el logo

function App() {
  return (
    <Router>
      {/* Navbar de Bootstrap */}
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          {/* Logo a la izquierda */}
          <Link to="/">
            <img src={tenpoLogo} alt="Tenpo Logo" className="navbar-logo" />
          </Link>
          {/* Menú a la derecha */}
          <div className="menu-buttons">
            <Link className="navbar-brand lner-text-1" to="/transaction">
              Ver Transacciones
            </Link>
            <Link className="navbar-brand lner-text-1" to="/transaction/new">
              Crear Transacción
            </Link>
          </div>
        </div>
      </nav>

      {/* Rutas */}
      <Routes>
        <Route path="/" element={<TransactionsPage />} />
        <Route path="/transaction" element={<TransactionsPage />} />
        <Route path="/transaction/new" element={<NewTransactionPage />} />
        <Route path="/transaction/:id/edit" element={<EditTransactionPage />} />
        <Route path="/*" element={<TransactionsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
