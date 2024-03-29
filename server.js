// server.js

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var url = require('url');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/inventoryDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// Item model
const Item = mongoose.model('Item', {
  name: String,
  description: String,
  quantity: Number,
  location: String,
  category: String
});

// Middleware
app.use(bodyParser.json());

// Routes
app.get('/items', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/items', async (req, res) => {
  const newItem = new Item(req.body);
  try {
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
