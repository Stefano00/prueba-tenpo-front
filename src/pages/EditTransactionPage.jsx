import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import TransactionForm from '../components/TransactionForm';

function EditTransactionPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/transaction/${id}`);
        setTransaction(response.data);
      } catch (error) {
        console.error('Error al obtener la transacción:', error);
      }
    };
    fetchTransaction();
  }, [id]);

  const handleSaved = () => {
    alert('Transacción actualizada. Redirigiendo al listado de transacciones...');
    navigate('/transaction');
  };

  if (!transaction) {
    return <p>Cargando transacción...</p>;
  }

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <h1>Editar Transacción #{id}</h1>
      <TransactionForm
        editingTransaction={transaction}
        onSaved={handleSaved}
      />
    </div>
  );
}

export default EditTransactionPage;
