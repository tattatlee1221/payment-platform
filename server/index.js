const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// 模擬交易數據
const transactions = [
  { dt: "2025-03-25", merchId: "M001", transId: "T123", clientRef: "CR001", ccy: "USD", amt: 100.50, transSts: "Completed" },
  { dt: "2025-03-24", merchId: "M002", transId: "T124", clientRef: "CR002", ccy: "HKD", amt: 500.00, transSts: "Pending" },
];

// 登入 API
app.post('/api/login', (req, res) => {
  const { loginName, password } = req.body;
  if (loginName && password) {
    res.json({ success: true, token: 'fake-jwt-token' });
  } else {
    res.status(400).json({ success: false, message: '登入失敗' });
  }
});

// 獲取交易數據
app.get('/api/transactions', (req, res) => {
  res.json(transactions);
});

// 忘記密碼（模擬）
app.post('/api/forget-password', (req, res) => {
  const { email } = req.body;
  res.json({ success: true, message: `已發送重設密碼郵件至 ${email}` });
});

app.listen(port, () => {
  console.log(`後端運行於 http://localhost:${port}`);
});