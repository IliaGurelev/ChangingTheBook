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

app.get('/api/books', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM books');
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка получения данных BOOKS:', err);
    res.status(500).send('Ошибка сервера');
  }
});

app.post('/api/books', async(req, res) => {
  try {
    const {idUser} = req.body;
    const result = await pool.query(`SELECT * FROM books WHERE id_owner=${idUser}`);
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка получения данных BOOKS POST: ', err);
    res.status(500).send('Ошибка сервера');
  }
})

app.post('/api/add-books', async (req, res) => {
  try {
    const { name, preview_image, description, id_owner } = req.body;

    const insertQuery = `
      INSERT INTO books (id, name, preview_image, description, id_owner) 
      VALUES (default, $1, $2, $3, $4) 
      RETURNING *
    `;
    const insertResult = await pool.query(insertQuery, [name, preview_image, description, id_owner]);

    res.json(insertResult.rows[0]);
  } catch (err) {
    console.error('Ошибка получения данных ADD-BOOKS:', err);
    res.status(500).send('Ошибка сервера');
  }
})

// PUT - Обновление данных книги
app.put('/api/update-book/:id', async (req, res) => {
  try {
    const { name, preview_image, description } = req.body;
    const bookId = req.params.id;

    const updateQuery = `
      UPDATE books
      SET name = $1, preview_image = $2, description = $3
      WHERE id = $4
      RETURNING *
    `;
    const updateResult = await pool.query(updateQuery, [name, preview_image, description, bookId]);

    if (updateResult.rows.length === 0) {
      return res.status(404).send('Книга не найдена');
    }

    res.json(updateResult.rows[0]);
  } catch (err) {
    console.error('Ошибка обновления книги:', err);
    res.status(500).send('Ошибка сервера');
  }
});

// DELETE - Удаление книги
app.delete('/api/delete-book/:id', async (req, res) => {
  try {
    const bookId = req.params.id;

    const deleteQuery = `
      DELETE FROM books
      WHERE id = $1
      RETURNING *
    `;
    const deleteResult = await pool.query(deleteQuery, [bookId]);

    if (deleteResult.rows.length === 0) {
      return res.status(404).send('Книга не найдена');
    }

    res.json({ message: 'Книга успешно удалена', deletedBook: deleteResult.rows[0] });
  } catch (err) {
    console.error('Ошибка удаления книги:', err);
    res.status(500).send('Ошибка сервера');
  }
});

app.post('/api/messager', async (req, res) => {
  try {
    const {id} = req.body;
    const result = await pool.query(`SELECT messager.id, id_owner, id_buyer, users.name AS name_owner, users.avatar_id AS avatar_owner, buyer.name AS name_buyer, buyer.avatar_id AS avatar_buyer FROM messager 
      INNER JOIN users ON users.id=messager.id_owner
	    INNER JOIN users AS buyer ON buyer.id = messager.id_buyer
      WHERE id_buyer=${id} OR id_owner=${id}`);
    res.json(result.rows);
  } catch (err) {
    console.error('Ошибка получения данных MESSAGER:', err);
    res.status(500).send('Ошибка сервера');
  }
});

app.post('/api/add-messager', async (req, res) => {
  try {
    const { id_owner, id_buyer } = req.body;

    const checkQuery = `
      SELECT * FROM messager 
      WHERE (id_owner = $1 AND id_buyer = $2) 
         OR (id_owner = $2 AND id_buyer = $1)
    `;
    const checkResult = await pool.query(checkQuery, [id_owner, id_buyer]);

    if (checkResult.rows.length > 0) {
      return res.json(checkResult.rows[0]);
    }

    const insertQuery = `
      INSERT INTO messager (id, id_owner, id_buyer) 
      VALUES (default, $1, $2) 
      RETURNING *
    `;
    const insertResult = await pool.query(insertQuery, [id_owner, id_buyer]);

    res.json(insertResult.rows[0]);
  } catch (err) {
    console.error('Ошибка получения данных ADD-MESSAGER:', err);
    res.status(500).send('Ошибка сервера');
  }
});


app.post('/api/messages', async(req, res) => {
  try {
    const {id} = req.body;
    const result = await pool.query(`SELECT * FROM message WHERE id_messager=${ id }`);
    res.json(result.rows);
  } catch (error) {
    console.error('ОШИБКА получения данных MESSAGES: ', error);
    res.status(500).send('ошибка сервера')
  }
});

app.post('/api/add-message', async (req, res) => {
  try {
    const { id_messager, id_sender, text} = req.body;
    const result = await pool.query(`INSERT INTO message (id, id_messager, id_sender, text) VALUES (default, ${id_messager}, ${id_sender}, '${text}')`);
    res.json(true);
  } catch (error) {
    console.error('ОШИБКА добовления данных ADD-MESSAGE: ', error);
    res.status(500).send('ошибка сервера')
  }
});

app.post('/api/user', async (req, res) => {
  try {
    const {id} = req.body;
    const query = `SELECT id, email, name, avatar_id FROM users WHERE id=${id}`
    const result = await pool.query(query)
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Ошибка получения данных USER: ', req.body, ' ОШИБКА: ', err,);
    res.status(500).send('Ошибка сервера');
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query(`SELECT * FROM users WHERE email = '${email}'`)

    if (result.rows.length > 0) {
      const user = result.rows[0];

      if (user.password === password) {
        return res.json({ success: true, userId: user.id });
      } else {
        return res.send({ success: false, message: 'Неправильный пароль или логин' });
      }
    }
    else {
      return res.send({ success: false, message: 'Неправильный пароль или логин' })
    }
  } catch (error) {
    return res.send({ success: false, message: 'Неправильный пароль или логин' });
  }
});

app.post('/api/signup', async (req, res) => {
  try {
    const { email, password, name, avatar_id } = req.body;

    // Проверка, существует ли уже такой email
    const emailCheck = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (emailCheck.rows.length > 0) {
      return res.json({ success: false, message: 'Почта уже занята' });
    }

    // Вставка нового пользователя и возврат его id
    const result = await pool.query(
      'INSERT INTO users (email, password, name, avatar_id) VALUES ($1, $2, $3, $4) RETURNING id',
      [email, password, name, avatar_id]
    );

    // Возвращаем успех и userId
    return res.json({ success: true, userId: result.rows[0].id });
  } catch (error) {
    console.error('Ошибка регистрации:', error);
    return res.json({ success: false, message: 'Ошибка регистрации' });
  }
});

app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});