const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = 3000;

app.use(cors());

const db = new sqlite3.Database('database.db');

db.run('CREATE TABLE IF NOT EXISTS texts (text TEXT)');

app.post('/addText', express.json(), (req, res) => {
  const text = req.body.text;

  db.run('INSERT INTO texts (text) VALUES (?)', [text], function (err) {
    if (err) {
      return res.status(500).send(err.message);
    }
    res.send(`Tetx "${text}" added`);
  });
});

app.get('/getTexts', (req, res) => {
  db.all('SELECT * FROM texts', [], function (err, rows) {
    if (err) {
      return res.status(500).send(err.message);
    }
    const texts = rows.map((row) => row.text);
    res.json(texts);
  });
});

app.listen(port, () => {
  console.log(`Server run on port:  ${port}`);
});
