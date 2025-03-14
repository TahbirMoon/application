// server.js

const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Connect to the SQLite database
let db = new sqlite3.Database('my-database.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Create a new table called "users" with three fields: id, name, email, and age
db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, email TEXT, age INTEGER)', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Table created or already exists.');
});

// Add the age column if it doesn't exist
db.run('ALTER TABLE users ADD COLUMN age INTEGER', (err) => {
  if (err && !err.message.includes("duplicate column name: age")) {
    console.error(err.message);
  }
  console.log('Age column added or already exists.');
});

// Endpoint to add a new user
app.post('/add-user', (req, res) => {
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).send('Name, email, and age are required');
  }

  let sql = 'INSERT INTO users (name, email, age) VALUES (?, ?, ?)';
  let values = [name, email, age];

  db.run(sql, values, function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).send(`A row has been inserted with rowid ${this.lastID}`);
  });
});

// Endpoint to get all users
app.get('/users', (req, res) => {
  let sql = 'SELECT * FROM users';

  db.all(sql, [], (err, rows) => {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.status(200).json(rows);
  });
});

// Endpoint to update a user
app.put('/update-user/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;

  if (!name || !email || !age) {
    return res.status(400).send('Name, email, and age are required');
  }

  let sql = 'UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?';
  let values = [name, email, age, id];

  db.run(sql, values, function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (this.changes === 0) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(`User with id ${id} updated`);
  });
});

// Endpoint to delete a user
app.delete('/delete-user/:id', (req, res) => {
  const { id } = req.params;

  let sql = 'DELETE FROM users WHERE id = ?';
  let values = [id];

  db.run(sql, values, function(err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    if (this.changes === 0) {
      return res.status(404).send('User not found');
    }
    res.status(200).send(`User with id ${id} deleted`);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Close the database connection when the server shuts down
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
    process.exit(0);
  });
});
