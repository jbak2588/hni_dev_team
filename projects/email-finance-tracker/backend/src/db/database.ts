import Database from 'better-sqlite3';
import path from 'path';

const db = new Database('finance.db');

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE,
      google_refresh_token TEXT
    );

    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      date TEXT,
      amount REAL,
      currency TEXT,
      merchant TEXT,
      category TEXT,
      type TEXT, -- expense, income
      raw_message_id TEXT UNIQUE,
      FOREIGN KEY(user_id) REFERENCES users(id)
    );
  `);
}

export default db;
