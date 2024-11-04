const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(express.static('public'));

// 添加版本1的路由
app.get('/v1', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'v1.html'));
});

// 添加版本2的路由
app.get('/v2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'v2.html'));
});

// 添加版本3的路由
app.get('/v3', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 重定向根路由到 v3
app.get('/', (req, res) => {
  res.redirect('/v3');
});

// 处理404错误
app.use((req, res) => {
  res.status(404).send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>页面未找到</title>
      <meta charset="utf-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          padding: 50px;
        }
        .error-container {
          max-width: 600px;
          margin: 0 auto;
        }
        .back-link {
          color: #007bff;
          text-decoration: none;
          margin-top: 20px;
          display: inline-block;
        }
      </style>
    </head>
    <body>
      <div class="error-container">
        <h1>404 - 页面未找到</h1>
        <p>抱歉，您请求的页面不存在。</p>
        <a href="/v3" class="back-link">返回主页</a>
      </div>
    </body>
    </html>
  `);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 