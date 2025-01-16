import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TransactionForm({ editingTransaction, onSaved, onCancelEdit }) {
  const [amount, setAmount] = useState('');
  const [giro, setGiro] = useState('');
  const [tenpistaName, setTenpistaName] = useState('');

  useEffect(() => {
    if (editingTransaction) {
      setAmount(editingTransaction.amount);
      setGiro(editingTransaction.giro);
      setTenpistaName(editingTransaction.tenpistaName || '');
    } else {
      setAmount('');
      setGiro('');
      setTenpistaName('');
    }
  }, [editingTransaction]);

  const validateForm = () => {
    if (!amount || isNaN(amount) || Number(amount) < 0) {
      alert('El monto debe ser un número no negativo.');
      return false;
    }
    if (!giro) {
      alert('El giro no puede estar vacío.');
      return false;
    }
    if (!tenpistaName) {
      alert('El nombre del Tenpista no puede estar vacío.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const transactionData = {
      amount: Number(amount),
      giro,
      tenpistaName,
    };

    try {
      if (editingTransaction) {
        await axios.put(`http://localhost:8080/transaction/${editingTransaction.transactionId}`, transactionData);
        alert('Transacción actualizada exitosamente');
      } else {
        await axios.post('http://localhost:8080/transaction', transactionData);
        alert('Transacción creada exitosamente');
      }
      onSaved();
    } catch (error) {
      alert(`Error al guardar la transacción: ${error?.response?.data?.message || error.message}`);
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="transaction-form">
      <div className="form-group">
        <label>Monto:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>Giro (comercio):</label>
        <input
          type="text"
          value={giro}
          onChange={(e) => setGiro(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label>Tenpista (Nombre):</label>
        <input
          type="text"
          value={tenpistaName}
          onChange={(e) => setTenpistaName(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="form-actions">
        <button type="submit" className="button button-primary">
          {editingTransaction ? 'Actualizar' : 'Crear'}
        </button>
        {editingTransaction && (
          <button type="button" className="button button-secondary" onClick={onCancelEdit}>
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default TransactionForm;
