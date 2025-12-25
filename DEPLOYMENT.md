# Telegram Mini Shop App - Deployment Guide

## Project Overview

Complete Telegram Mini App for shopping with:
- Frontend: HTML/CSS/JavaScript mini app interface
- Backend: Python bot using aiogram 3
- Frontend Deployment: Vercel
- Backend Deployment: Railway

## Prerequisites

1. Telegram Bot Token (from BotFather)
2. Vercel Account (vercel.com)
3. Railway Account (railway.app)
4. GitHub Account (for hosting code)

## Deployment Steps

### 1. Create Telegram Bot

1. Open Telegram and search for @BotFather
2. Send `/newbot` command
3. Choose a name and username for your bot
4. Save the BOT_TOKEN provided

### 2. Deploy Frontend to Vercel

1. Connect your GitHub repo to Vercel
2. Vercel will auto-detect the frontend
3. Set build command: `npm install && npm run build`
4. Set output directory: `dist`
5. Deploy and get your frontend URL (e.g., https://telegram-mini-shop-app.vercel.app)

### 3. Deploy Backend to Railway

1. Go to railway.app and sign in
2. Create new project from GitHub
3. Select this repository
4. Configure environment variables:
   - `BOT_TOKEN`: Your Telegram bot token
   - `MINIAPP_URL`: Your Vercel frontend URL
5. Railway will auto-detect Procfile and deploy

### 4. Configure Bot in BotFather

1. Open BotFather on Telegram
2. Send `/mybots` and select your bot
3. Go to Bot Settings > Menu Button
4. Set "Web App" type with your Vercel URL
5. Save configuration

## Environment Variables

### Backend (.env file)

```
BOT_TOKEN=your_telegram_bot_token_here
MINIAPP_URL=https://your-vercel-domain.vercel.app
```

## File Structure

```
telegram-mini-shop-app/
├── frontend/
│   └── src/
│       ├── index.html
│       ├── main.js
│       └── style.css
├── backend/
│   ├── bot.py
│   └── requirements.txt
├── vite.config.js
├── Procfile
└── package.json
```

## Testing

1. Start chat with your bot on Telegram
2. Send `/start` command
3. Click "Open Shop" button
4. Test shop functionality:
   - Browse products
   - Add items to cart
   - View cart
   - Checkout

## Troubleshooting

### Bot not responding
- Verify BOT_TOKEN is correct
- Check Railway logs for errors
- Ensure miniapp URL is accessible

### Mini app not loading
- Check Vercel deployment status
- Verify MINIAPP_URL is correct in bot settings
- Check browser console for errors

### Cart not persisting
- Data is stored in localStorage (browser)
- Clear cache if needed for testing

## Features

✓ Telegram bot integration
✓ Web App mini app interface
✓ Product listing and browsing
✓ Shopping cart functionality
✓ Checkout process
✓ Responsive design
✓ Haptic feedback support
✓ Product price calculation

## Technologies Used

- **Frontend**: HTML, CSS, JavaScript, Telegram WebApp API
- **Backend**: Python, aiogram 3, asyncio
- **Build**: Vite
- **Deployment**: Vercel (frontend), Railway (backend)

## Notes

- The mini app communicates with the bot via Telegram WebApp API
- Cart data is stored locally in the browser
- Product data is hardcoded (can be extended with API)
- Haptic feedback requires Telegram app support

## Support

For issues or questions, check:
- Telegram Bot API documentation
- aiogram documentation
- Vercel deployment guides
- Railway deployment guides
