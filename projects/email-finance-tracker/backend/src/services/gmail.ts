import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';
import dotenv from 'dotenv';

dotenv.config();

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI
);

export function getAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: ['https://www.googleapis.com/auth/gmail.readonly'],
    prompt: 'consent'
  });
}

export async function getTokens(code: string) {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

export async function listPaymentEmails(auth: OAuth2Client) {
  const gmail = google.gmail({ version: 'v1', auth });

  // Keywords commonly found in Korean payment/bank emails
  const query = '승인 OR 결제 OR 입금 OR 송금 OR "payment" OR "receipt"';

  const res = await gmail.users.messages.list({
    userId: 'me',
    q: query,
    maxResults: 20
  });

  return res.data.messages || [];
}

export async function getMessageDetails(auth: OAuth2Client, messageId: string) {
  const gmail = google.gmail({ version: 'v1', auth });
  const res = await gmail.users.messages.get({
    userId: 'me',
    id: messageId,
    format: 'full'
  });

  return res.data;
}

// Simple helper to extract body text
export function extractBody(payload: any): string {
  if (payload.body?.data) {
    return Buffer.from(payload.body.data, 'base64').toString();
  }
  if (payload.parts) {
    return payload.parts.map(extractBody).join('\n');
  }
  return '';
}
