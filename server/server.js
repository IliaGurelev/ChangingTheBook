import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import pg from 'pg';

const { Pool } = pg;

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ExchangeBook',
  password: '0000',
  port: 5434, 
});

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Ошибка подключения к базе данных:', err);
  } else {
    console.log('Успешно подключено к базе данных:', res.rows[0]);
  }
});

// Пример API-эндпойнта для получения данных из базы данных
app.get('/api/books', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM Books');
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка получения данных:', err);
    res.status(500).send('Ошибка сервера');
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});