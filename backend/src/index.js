const express = require('express');
const db = require('./db');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares
app.use(cors());
app.use(express.json());


// SQLite: Tabloyu oluştur (varsa atla)
db.schema.hasTable('todos').then(exists => {
  if (!exists) {
    return db.schema.createTable('todos', table => {
      table.increments('db_id').primary();
      table.integer('id').unique().notNullable();
      table.string('text').notNullable();
      table.boolean('completed').defaultTo(false);
      table.timestamp('created_at').defaultTo(db.fn.now());
      table.timestamp('updated_at').defaultTo(db.fn.now());
    });
  }
});

// Routes

app.get('/api/todos', async (req, res) => {
  try {
    const todos = await db('todos').select('*').orderBy('created_at', 'desc');
    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Görevler alınırken hata oluştu.' });
  }
});

app.post('/api/todos', async (req, res) => {
  try {
    const { id, text, completed } = req.body;
    if (!text || typeof id !== 'number') {
      return res.status(400).json({ message: 'Geçersiz veri.' });
    }
    const existing = await db('todos').where({ id }).first();
    if (existing) {
      return res.status(409).json({ message: 'Bu id zaten kullanılıyor.' });
    }
    const [db_id] = await db('todos').insert({ id, text, completed: !!completed });
    const todo = await db('todos').where({ db_id }).first();
    res.status(201).json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Görev oluşturulurken hata oluştu.' });
  }
});

app.put('/api/todos/:id', async (req, res) => {
  try {
    const todoId = Number(req.params.id);
    const { text, completed } = req.body;
    const updated = await db('todos')
      .where({ id: todoId })
      .update({
        text,
        completed,
        updated_at: db.fn.now(),
      });
    if (!updated) {
      return res.status(404).json({ message: 'Görev bulunamadı.' });
    }
    const todo = await db('todos').where({ id: todoId }).first();
    res.json(todo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Görev güncellenirken hata oluştu.' });
  }
});

app.delete('/api/todos/:id', async (req, res) => {
  try {
    const todoId = Number(req.params.id);
    const deleted = await db('todos').where({ id: todoId }).del();
    if (!deleted) {
      return res.status(404).json({ message: 'Görev bulunamadı.' });
    }
    res.json({ message: 'Görev silindi.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Görev silinirken hata oluştu.' });
  }
});

app.get('/', (req, res) => {
  res.send('Todo API is running');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

