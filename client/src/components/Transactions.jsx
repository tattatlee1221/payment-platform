import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Transactions() {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/transactions')
      .then(response => setTransactions(response.data))
      .catch(error => console.error('獲取交易失敗', error));
  }, []);

  return (
    <div className="container">
      <h1>交易記錄</h1>
      <table>
        <thead>
          <tr>
            <th>交易日期</th>
            <th>商家 ID</th>
            <th>交易編號</th>
            <th>商家參考</th>
            <th>貨幣</th>
            <th>金額</th>
            <th>狀態</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(t => (
            <tr key={t.transId}>
              <td>{t.dt}</td>
              <td>{t.merchId}</td>
              <td>{t.transId}</td>
              <td>{t.clientRef}</td>
              <td>{t.ccy}</td>
              <td>{t.amt}</td>
              <td>{t.transSts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Transactions;