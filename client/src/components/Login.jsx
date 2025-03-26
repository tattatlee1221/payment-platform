import React, { useState } from 'react';
import axios from 'axios';

function Login({ setIsLoggedIn }) {
  const [loginName, setLoginName] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/login', { loginName, password });
      if (response.data.success) {
        setIsLoggedIn(true);
      }
    } catch (err) {
      setError('登入失敗');
    }
  };

  return (
    <div className="container">
      <h1>登入</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          登入名稱: <input type="text" value={loginName} onChange={(e) => setLoginName(e.target.value)} required />
        </label>
        <label>
          密碼: <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="button" onClick={() => alert('模擬 Google Auth')}>Google 登入</button>
        <p>CAPTCHA: <input type="checkbox" /> 我不是機器人 (模擬)</p>
        <button type="submit">登入</button>
      </form>
    </div>
  );
}

export default Login;