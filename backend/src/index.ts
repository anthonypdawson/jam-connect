import express from 'express';
import cors from 'cors';
import { PrismaClient } from './generated/prisma';
import bcrypt from 'bcryptjs';

const app = express();
app.use(cors());
const port = 4000;
const prisma = new PrismaClient();

app.use(express.json());

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Musicians Connect backend!' });
});

// Sign up endpoint
app.post('/api/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  // Check if user exists
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return res.status(409).json({ error: 'Email already registered.' });
  }
  // Hash password
  const passwordHash = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        passwordHash
      }
    });
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    res.status(500).json({ error: 'Registration failed.' });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }
  const user = await prisma.user.findUnique({ 
    where: { email },
    include: {
      instruments: true
    }
  });
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return res.status(401).json({ error: 'Invalid credentials.' });
  }
  
  // Return user without passwordHash for security
  const { passwordHash, ...userWithoutPassword } = user;
  res.status(200).json({ 
    message: 'Login successful.', 
    user: userWithoutPassword 
  });
});

app.listen(port, () => {
  console.log(`Backend listening at http://localhost:${port}`);
});
