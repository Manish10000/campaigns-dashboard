import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.join(process.cwd(), 'data', 'auth.db');

// Ensure data directory exists
import fs from 'fs';
const dataDir = path.dirname(dbPath);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);

// Initialize database schema
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    name TEXT,
    avatar TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  
  CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
`);

export interface User {
  id: number;
  email: string;
  password: string;
  name: string | null;
  avatar: string | null;
  created_at: string;
  updated_at: string;
}

export function findUserByEmail(email: string): User | undefined {
  const stmt = db.prepare('SELECT * FROM users WHERE email = ?');
  return stmt.get(email) as User | undefined;
}

export function findUserById(id: number): User | undefined {
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  return stmt.get(id) as User | undefined;
}

export function createUser(data: {
  email: string;
  password: string;
  name?: string;
  avatar?: string;
}): User {
  const stmt = db.prepare(`
    INSERT INTO users (email, password, name, avatar)
    VALUES (?, ?, ?, ?)
  `);
  
  const result = stmt.run(
    data.email,
    data.password,
    data.name || null,
    data.avatar || null
  );
  
  return findUserById(result.lastInsertRowid as number)!;
}

export function updateUser(id: number, data: Partial<Omit<User, 'id' | 'created_at'>>): User | undefined {
  const fields: string[] = [];
  const values: (string | null)[] = [];
  
  if (data.email !== undefined) {
    fields.push('email = ?');
    values.push(data.email);
  }
  if (data.password !== undefined) {
    fields.push('password = ?');
    values.push(data.password);
  }
  if (data.name !== undefined) {
    fields.push('name = ?');
    values.push(data.name);
  }
  if (data.avatar !== undefined) {
    fields.push('avatar = ?');
    values.push(data.avatar);
  }
  
  if (fields.length === 0) return findUserById(id);
  
  fields.push('updated_at = CURRENT_TIMESTAMP');
  values.push(id.toString());
  
  const stmt = db.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`);
  stmt.run(...values.slice(0, -1), id);
  
  return findUserById(id);
}

export default db;
