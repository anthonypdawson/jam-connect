import express from 'express';

const app = express();
const port = 3001;

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Musicians Connect backend!' });
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
