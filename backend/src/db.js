// Knex ve SQLite bağlantısı
const knex = require('knex');

const db = knex({
  client: 'sqlite3',
  connection: {
    filename: './todo.sqlite3',
  },
  useNullAsDefault: true,
});

module.exports = db;
