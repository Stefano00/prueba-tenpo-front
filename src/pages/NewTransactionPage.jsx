// src/pages/NewTransactionPage.jsx
import React from 'react';
import TransactionForm from '../components/TransactionForm';

function NewTransactionPage() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Crear Nueva Transacción</h1>
      <TransactionForm 
        // Aquí pasas props si necesitas
        onSaved={() => {
          alert('Transacción creada. Puedes redirigir o hacer otra acción.');
          // por ejemplo, window.location.href = '/transactions';
        }}
      />
    </div>
  );
}

export default NewTransactionPage;
