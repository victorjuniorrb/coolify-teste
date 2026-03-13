const express = require('express');
const { Pool } = require('pg');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// PostgreSQL connection setup
// The DATABASE_URL is provided by Coolify or docker-compose
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Create table if it doesn't exist
const initDb = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS messages (
        id SERIAL PRIMARY KEY,
        text VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Database initialized successfully.');
  } catch (err) {
    console.error('Error initializing database', err.stack);
    // Exit if we can't connect to the DB on startup
    process.exit(1);
  }
};

app.use(express.json());
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, 'build')));

// API endpoint to get messages
app.get('/api/messages', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM messages ORDER BY created_at DESC LIMIT 20');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching messages', err.stack);
    res.status(500).send('Server Error');
  }
});

// API endpoint to add a message
app.post('/api/messages', async (req, res) => {
  const { text } = req.body;
  if (!text || text.trim().length === 0 || text.length > 255) {
    return res.status(400).send('Message text is invalid.');
  }
  try {
    const result = await pool.query('INSERT INTO messages (text) VALUES ($1) RETURNING *', [text.trim()]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting message', err.stack);
    res.status(500).send('Server Error');
  }
});

// Handles any requests that don't match the ones above
app.get('*', (req,res) =>{
    res.sendFile(path.join(__dirname+'/build/index.html'));
});

// Start the server after initializing the DB
initDb().then(() => {
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
