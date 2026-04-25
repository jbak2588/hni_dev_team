import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function parseEmailContent(body: string) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = `
    Extract financial transaction details from the following email content.
    The content is likely a payment notification, card approval, or bank transfer in Korean or English.

    Email Content:
    """
    ${body}
    """

    Respond strictly in JSON format with the following fields:
    {
      "date": "YYYY-MM-DD",
      "amount": number,
      "currency": "KRW", "USD", etc.,
      "merchant": "Name of the store or person",
      "type": "expense" or "income",
      "category": "Food", "Transport", "Shopping", "Salary", etc.
    }
    If multiple transactions are found, return an array of objects.
    If no transaction is found, return null.
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Remove markdown code blocks if present
    const jsonStr = text.replace(/```json|```/g, "").trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("AI Parsing Error:", error);
    return null;
  }
}
