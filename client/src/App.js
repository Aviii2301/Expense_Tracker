import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({ title: '', amount: '', date: '' });

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/expenses');
      setExpenses(data);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
  };

  const addExpense = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/expenses', newExpense);
      setNewExpense({ title: '', amount: '', date: '' });
      fetchExpenses();
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };

  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/expenses/${id}`);
      fetchExpenses();
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const calculateTotalExpense = () => {
    return expenses.reduce((total, exp) => total + parseFloat(exp.amount), 0);
  };

  return (
    <div className="app-container">
      <h1 className="app-header">Expense Tracker</h1>
      <form className="expense-form" onSubmit={addExpense}>
        <input
          className="form-input"
          type="text"
          placeholder="Title"
          value={newExpense.title}
          onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
          required
        />
        <input
          className="form-input"
          type="number"
          placeholder="Amount"
          value={newExpense.amount}
          onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
          required
        />
        <input
          className="form-input"
          type="date"
          value={newExpense.date}
          onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
          required
        />
        <button className="form-button" type="submit">Add Expense</button>
      </form>

<ul className="expense-list">
        {expenses.map((exp) => (
          <li className="expense-item" key={exp._id}>
            <span>{exp.title}</span> - <span>${exp.amount}</span> - <span>{new Date(exp.date).toLocaleDateString()}</span>
            <button className="delete-button" onClick={() => deleteExpense(exp._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <h2 className="total-expense">Total Expense: ${calculateTotalExpense().toFixed(2)}</h2>
    </div>
  );
};

export default App;




