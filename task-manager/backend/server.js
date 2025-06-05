const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

const USERS_FILE = path.join(__dirname, 'users.json');
const TASKS_FILE = path.join(__dirname, 'tasks.json');

app.use(cors());
app.use(express.json());

function readUsers() {
  if (!fs.existsSync(USERS_FILE)) return [];
  return JSON.parse(fs.readFileSync(USERS_FILE));
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function readTasks() {
  if (!fs.existsSync(TASKS_FILE)) return [];
  return JSON.parse(fs.readFileSync(TASKS_FILE));
}

function writeTasks(tasks) {
  fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
}

// ===== Auth Routes =====
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const users = readUsers();
  const user = users.find(u => u.username === username && u.password === password);
  if (user) return res.json({ success: true, user });
  res.status(401).json({ success: false, message: 'Invalid credentials' });
});

app.post('/api/register', (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ success: false, message: 'All fields required' });
  }

  const users = readUsers();
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ success: false, message: 'Username exists' });
  }

  const newUser = { id: Date.now(), username, password, role };
  users.push(newUser);
  writeUsers(users);
  res.status(201).json({ success: true, user: newUser });
});

// ===== User Management =====
app.get('/api/users', (req, res) => {
  const users = readUsers();
  res.json(users);
});

app.post('/api/users', (req, res) => {
  const { username, password, role } = req.body;
  if (!username || !password || !role) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const users = readUsers();
  if (users.find(u => u.username === username)) {
    return res.status(409).json({ success: false, message: 'Username already exists' });
  }

  const newUser = { id: Date.now(), username, password, role };
  users.push(newUser);
  writeUsers(users);
  res.status(201).json({ success: true, user: newUser });
});

app.put('/api/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { username, password, role } = req.body;

  const users = readUsers();
  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  users[index] = { ...users[index], username, password, role };
  writeUsers(users);
  res.json({ success: true, user: users[index] });
});

app.delete('/api/users/:id', (req, res) => {
  let users = readUsers();
  const id = parseInt(req.params.id);

  const exists = users.some(u => u.id === id);
  if (!exists) return res.status(404).json({ success: false, message: 'User not found' });

  users = users.filter(u => u.id !== id);
  writeUsers(users);
  res.json({ success: true });
});

// ===== Task Management =====
app.get('/api/tasks', (req, res) => {
  res.json(readTasks());
});

app.get('/api/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const task = tasks.find(t => t.id === parseInt(req.params.id));
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});

app.post('/api/tasks', (req, res) => {
  const { title, description, status, userId } = req.body;

  if (!title || !description || !status) {
    return res.status(400).json({ message: 'Title, description, and status are required' });
  }

  const tasks = readTasks();
  const newTask = { id: Date.now(), title, description, status, userId: userId || null };
  tasks.push(newTask);
  writeTasks(tasks);
  res.status(201).json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, status, userId } = req.body;

  const tasks = readTasks();
  const index = tasks.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ message: 'Task not found' });

  tasks[index] = {
    ...tasks[index],
    title: title ?? tasks[index].title,
    description: description ?? tasks[index].description,
    status: status ?? tasks[index].status,
    userId: userId ?? tasks[index].userId,
  };

  writeTasks(tasks);
  res.json(tasks[index]);
});

app.delete('/api/tasks/:id', (req, res) => {
  let tasks = readTasks();
  const id = parseInt(req.params.id);

  const exists = tasks.some(t => t.id === id);
  if (!exists) return res.status(404).json({ success: false, message: 'Task not found' });

  tasks = tasks.filter(t => t.id !== id);
  writeTasks(tasks);
  res.json({ success: true });
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
