// task-backend/server.js
const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const filePath = './tasks.json';

const readTasks = () => JSON.parse(fs.readFileSync(filePath));
const writeTasks = (data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

// Routes
app.get('/tasks', (req, res) => res.json(readTasks()));
app.post('/tasks', (req, res) => {
  const tasks = readTasks();
  const newTask = { id: Date.now(), ...req.body };
  tasks.push(newTask);
  writeTasks(tasks);
  res.json(newTask);
});
app.put('/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const index = tasks.findIndex(t => t.id == req.params.id);
  if (index === -1) return res.status(404).send('Not found');
  tasks[index] = { ...tasks[index], ...req.body };
  writeTasks(tasks);
  res.json(tasks[index]);
});
app.delete('/tasks/:id', (req, res) => {
  const tasks = readTasks().filter(t => t.id != req.params.id);
  writeTasks(tasks);
  res.sendStatus(200);
});

app.listen(PORT, () => console.log(`Backend running at http://localhost:${PORT}`));
