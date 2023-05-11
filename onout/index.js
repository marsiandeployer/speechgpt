import path from 'path';
import { fileURLToPath } from 'url';
import express from 'express';

// Fix ReferenceError, because we cannot set __dirname directly in ES module.
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send(`
    // 
  `);
});

app.listen(3006, () => {
  console.log('Server running on port 3006');
});
