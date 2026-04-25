import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDb } from './db/database.js';
import { getAuthUrl, getTokens, listPaymentEmails, getMessageDetails, extractBody } from './services/gmail.js';
import { parseEmailContent } from './services/ai.js';
import db from './db/database.js';
import { google } from 'googleapis';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

initDb();

// 1. Google OAuth Endpoints
app.get('/api/auth/google/url', (req, res) => {
  res.json({ url: getAuthUrl() });
});

app.get('/api/auth/google/callback', async (req, res) => {
  const { code } = req.query;
  try {
    const tokens = await getTokens(code as string);
    // In a real app, you'd associate this with a user in the session/DB
    // For now, we'll just store the refresh token for a default user
    db.prepare('INSERT OR REPLACE INTO users (id, google_refresh_token) VALUES (1, ?)').run(tokens.refresh_token);
    res.send('Authenticated! You can close this window.');
  } catch (error) {
    res.status(500).send('Auth failed');
  }
});

// 2. Sync Endpoint
app.post('/api/sync', async (req, res) => {
  const user = db.prepare('SELECT google_refresh_token FROM users WHERE id = 1').get() as { google_refresh_token: string };
  if (!user?.google_refresh_token) {
    return res.status(401).json({ error: 'Not authenticated' });
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );
  oauth2Client.setCredentials({ refresh_token: user.google_refresh_token });

  try {
    const messages = await listPaymentEmails(oauth2Client);
    let newTransactions = 0;

    for (const msg of messages) {
      // Check if already processed
      const exists = db.prepare('SELECT id FROM transactions WHERE raw_message_id = ?').get(msg.id);
      if (exists) continue;

      const details = await getMessageDetails(oauth2Client, msg.id!);
      const body = extractBody(details.payload);
      const parsed = await parseEmailContent(body);

      if (parsed) {
        const items = Array.isArray(parsed) ? parsed : [parsed];
        for (const item of items) {
          db.prepare(`
            INSERT INTO transactions (user_id, date, amount, currency, merchant, category, type, raw_message_id)
            VALUES (1, ?, ?, ?, ?, ?, ?, ?)
          `).run(item.date, item.amount, item.currency, item.merchant, item.category, item.type, msg.id);
          newTransactions++;
        }
      }
    }

    res.json({ success: true, count: newTransactions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Sync failed' });
  }
});

// 3. Transactions API
app.get('/api/transactions', (req, res) => {
  const transactions = db.prepare('SELECT * FROM transactions ORDER BY date DESC').all();
  res.json(transactions);
});

// 4. Summary API
app.get('/api/summary', (req, res) => {
  const stats = db.prepare(`
    SELECT
      type,
      SUM(amount) as total
    FROM transactions
    GROUP BY type
  `).all();
  res.json(stats);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
