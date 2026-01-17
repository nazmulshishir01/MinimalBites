const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database file path
const DB_PATH = path.join(__dirname, 'data', 'db.json');

// Helper function to read database
function readDB() {
  try {
    const data = fs.readFileSync(DB_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return { items: [] };
  }
}

// Helper function to write database
function writeDB(data) {
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
}

// GET all items
app.get('/api/items', (req, res) => {
  const db = readDB();
  res.json(db.items);
});

// GET single item by ID
app.get('/api/items/:id', (req, res) => {
  const db = readDB();
  const item = db.items.find(i => i.id === parseInt(req.params.id));
  
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// POST create new item
app.post('/api/items', (req, res) => {
  const db = readDB();
  
  // Generate new ID
  const maxId = db.items.reduce((max, item) => Math.max(max, item.id), 0);
  const newItem = {
    id: maxId + 1,
    ...req.body,
    rating: req.body.rating || 4.5,
    reviews: req.body.reviews || 0,
    isPopular: req.body.isPopular || false,
    isNew: req.body.isNew !== undefined ? req.body.isNew : true,
  };
  
  db.items.push(newItem);
  writeDB(db);
  
  res.status(201).json(newItem);
});

// PUT update item
app.put('/api/items/:id', (req, res) => {
  const db = readDB();
  const index = db.items.findIndex(i => i.id === parseInt(req.params.id));
  
  if (index !== -1) {
    db.items[index] = { ...db.items[index], ...req.body };
    writeDB(db);
    res.json(db.items[index]);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// DELETE item
app.delete('/api/items/:id', (req, res) => {
  const db = readDB();
  const index = db.items.findIndex(i => i.id === parseInt(req.params.id));
  
  if (index !== -1) {
    const deleted = db.items.splice(index, 1);
    writeDB(db);
    res.json(deleted[0]);
  } else {
    res.status(404).json({ error: 'Item not found' });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`
🍔 MinimalBites API Server Running!
📍 URL: http://localhost:${PORT}
📋 Endpoints:
   GET    /api/items      - Get all items
   GET    /api/items/:id  - Get single item
   POST   /api/items      - Create new item
   PUT    /api/items/:id  - Update item
   DELETE /api/items/:id  - Delete item
  `);
});
