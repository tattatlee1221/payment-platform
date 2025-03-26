import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Settings() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleForgetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/forget-password', { email });
      setMessage(response.data.message);
    } catch (err) {
      setMessage('提交失敗');
    }
  };

  const handleLogout = () => {
    navigate('/');
  };

  return (
    <div className="container">
      <h1>設置</h1>
      {message && <p className="success">{message}</p>}
      <h2>忘記密碼</h2>
      <form onSubmit={handleForgetPassword}>
        <label>
          電子郵件: <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <button type="submit">提交</button>
      </form>
      <h2>登出</h2>
      <button onClick={handleLogout}>登出</button>
    </div>
  );
}

export default Settings;