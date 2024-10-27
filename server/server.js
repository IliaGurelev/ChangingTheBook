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
    const result = await pool.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка получения данных:', err);
    res.status(500).send('Ошибка сервера');
  }
});

app.get('/api/messager', async (req, res) => {
  try {
    const {id} = req.body;
    const result = await pool.query(`SELECT id, books.name, books.preview_image FROM messager INNER JOIN books ON books.id=messager.id_tovar WHERE id_buyer=${id} OR books.id_owner=${id}`);
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка получения данных:', err);
    res.status(500).send('Ошибка сервера');
  }
});

app.post('/api/login', async (req, res) => {
  try{
    const {email, password} = req.body;
    const result = await pool.query(`SELECT * FROM users WHERE email='${email}'`)

    if(result.rows.length > 0)
    {
      const user = result.rows[0];

      if(user.password === password)
      {
        return res.send(user);
      } else {
        return res.send('Неправильный пароль или логин');
      }
    }
    else {
      return res.send('Неправильный пароль или логин')
    }
  } catch (error) {
    return res.send('Произошла ошибка, попробуйте позже');
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});