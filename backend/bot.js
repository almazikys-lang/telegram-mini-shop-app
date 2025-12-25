const express = require('express');
const { Telegraf } = require('telegraf');
const path = require('path');
require('dotenv').config();

const app = express();
const bot = new Telegraf(process.env.TELEGRAM_BOT_TOKEN);

app.use(express.json());
app.use(express.static(path.join(__dirname, '../frontend/dist')));

const WEB_APP_URL = process.env.TELEGRAM_MINI_APP_URL || 'https://example.com';

// Handle /start command
bot.command('start', async (ctx) => {
  await ctx.reply('Welcome to the Telegram Mini App!', {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🚀 Open Mini App',
            web_app: {
              url: WEB_APP_URL,
            },
          },
        ],
      ],
    },
  });
});

// Handle web app data
bot.on('web_app_data', async (ctx) => {
  console.log('Received data from mini app:', ctx.webAppData.data);
  try {
    const data = JSON.parse(ctx.webAppData.data);
    await ctx.reply(`✅ Received your data: ${data.message}`);
  } catch (e) {
    await ctx.reply('❌ Error processing data');
  }
});

// Fallback for other messages
bot.on('message', async (ctx) => {
  await ctx.reply('Use /start to launch the mini app!');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Bot is running!' });
});

// Serve frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// API endpoint
app.post('/api/process', (req, res) => {
  const { message } = req.body;
  res.json({ success: true, echo: message });
});

// Start server and bot
const PORT = process.env.PORT || 3000;

bot.launch({ polling: true });
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Bot is polling...');
});

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

module.exports = app;
