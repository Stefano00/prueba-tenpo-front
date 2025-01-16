import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TransactionList from '../components/TransactionList';

function TransactionsPage() {
  const navigate = useNavigate();
  const [refreshTrigger, setRefreshTrigger] = useState(Date.now());

  const handleEdit = (transaction) => {
    navigate(`/transaction/${transaction.transactionId}/edit`);
  };

  const handleRefresh = () => {
    setRefreshTrigger(Date.now()); // Cambia el valor para disparar el efecto en TransactionList
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Listado de Transacciones</h1>
      <TransactionList
        onEdit={handleEdit}
        onRefresh={handleRefresh}
        refreshTrigger={Date.now()}
      />
    </div>
  );
}

export default TransactionsPage;
