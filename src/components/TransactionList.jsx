import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function TransactionList({ onEdit, onRefresh, refreshTrigger }) {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Filas por página
  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const tableHeaders = ["Transaction ID", "Amount", "Giro", "Tenpista Name", "Date", "Actions"];

  useEffect(() => {
    fetchTransactions();
    // eslint-disable-next-line
  }, [refreshTrigger]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("http://localhost:8080/transaction");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this transaction?");
    if (confirm) {
      try {
        await axios.delete(`http://localhost:8080/transaction/${id}`);
        await fetchTransactions()
      } catch (error) {
        console.error("Error deleting transaction:", error);
      }
    }
  };

  const handleEdit = (tx) => {
    onEdit(tx);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = transactions.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="transactions-container">
      <h2>Transaction List</h2>
      {transactions.length === 0 ? (
        <p className="no-transactions">No transactions found.</p>
      ) : (
        <>
          <table className="transaction-table">
            <thead>
              <tr>
                {tableHeaders.map((header, index) => (
                  <th key={index} className={header === "Actions" ? "actions-column" : ""}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {currentItems.map((tx) => (
                <tr key={tx.transactionId}>
                  <td data-label="Transaction ID">{tx.transactionId}</td>
                  <td data-label="Amount">${tx.amount}</td>
                  <td data-label="Giro">{tx.giro}</td>
                  <td data-label="Tenpista Name">{tx.tenpistaName}</td>
                  <td data-label="Date">{new Date(tx.transactionDate).toLocaleDateString()}</td>
                  <td data-label="Actions" className="table-actions actions-column">
                    <button
                      onClick={() => handleEdit(tx)}
                      className="icon-button button-primary"
                      title="Editar"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                      onClick={() => handleDelete(tx.transactionId)}
                      className="icon-button button-secondary"
                      title="Eliminar"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <ul className="pagination">
            {[...Array(totalPages).keys()].map((num) => (
              <li key={num}>
                <button
                  onClick={() => paginate(num + 1)}
                  disabled={currentPage === num + 1}
                  className="pagination-button"
                >
                  {num + 1}
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default TransactionList;
