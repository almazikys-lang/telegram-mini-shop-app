import logging
from aiogram import Bot, Dispatcher, types, F
from aiogram.filters.command import Command
from aiogram.types import InlineKeyboardMarkup, InlineKeyboardButton, WebAppInfo
import asyncio
import os
from dotenv import load_dotenv

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

BOT_TOKEN = os.getenv('BOT_TOKEN')
MINIAPP_URL = os.getenv('MINIAPP_URL', 'https://telegram-mini-shop-app.vercel.app')

bot = Bot(token=BOT_TOKEN)
dp = Dispatcher()

@dp.message(Command("start"))
async def cmd_start(message: types.Message):
    """Send a message with inline keyboard containing web app button"""
    keyboard = InlineKeyboardMarkup(
        inline_keyboard=[
            [
                InlineKeyboardButton(
                    text="🛍️ Open Shop",
                    web_app=WebAppInfo(url=MINIAPP_URL)
                )
            ]
        ]
    )
    
    await message.answer(
        "Welcome to Telegram Mini Shop! 🎉\n\n"
        "Click the button below to open the shop and start shopping.",
        reply_markup=keyboard
    )

@dp.message(Command("help"))
async def cmd_help(message: types.Message):
    help_text = (
        "<b>Telegram Mini Shop Bot</b>\n\n"
        "<b>Commands:</b>\n"
        "/start - Start the bot and open shop\n"
        "/help - Show this help message\n"
        "/products - View available products\n\n"
        "<b>Features:</b>\n"
        "• Browse products\n"
        "• Add items to cart\n"
        "• Checkout easily\n"
    )
    await message.answer(help_text, parse_mode="HTML")

@dp.message(Command("products"))
async def cmd_products(message: types.Message):
    products_text = (
        "<b>Available Products</b>\n\n"
        "1. 💻 Premium Laptop\n"
        "   Price: $999.99\n\n"
        "2. 📱 Smartphone\n"
        "   Price: $599.99\n\n"
        "3. 🎧 Wireless Headphones\n"
        "   Price: $199.99\n\n"
        "Click the Shop button to explore all products!"
    )
    await message.answer(products_text, parse_mode="HTML")

@dp.message()
async def echo_handler(message: types.Message):
    await message.answer(
        "👋 Hello! Use /help to see available commands.\n"
        "Or click the Shop button to start shopping!"
    )

async def main():
    logger.info("Bot starting...")
    try:
        await dp.start_polling(bot, allowed_updates=dp.resolve_used_update_types())
    finally:
        await bot.session.close()

if __name__ == "__main__":
    asyncio.run(main())
