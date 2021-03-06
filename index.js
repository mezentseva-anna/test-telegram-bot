const telegramApi = require('node-telegram-bot-api')
const axios = require('axios')
const token = '5261290106:AAFbWlyMS3ioMCa8hc8GhmMgiAMCCjSs2GY'

const bot = new telegramApi(token, {polling: true})

bot.setMyCommands([
{command: '/start', description:'Начальное приветствие'},
  {command: '/info', description: 'Описание работы бота'},
])

bot.on('message', async msg => {
  const text = msg.text
  const chatId = msg.chat.id
  if (text === '/start') {
   await bot.sendSticker(chatId, 'https://tlgrm.ru/_/stickers/5fb/e86/5fbe8646-6371-463c-ba7d-bbc08ab0b860/12.webp')
   return bot.sendMessage(chatId, 'Добро пожаловать в тестовый телеграм бот! Отправь мне ссылку на новость, которой хочешь поделиться')
  }
  if (text === '/info') {
    return bot.sendMessage(chatId, 'Я умею создавать недолгоживущие странички со статьями из заблокированных источников, просто отправь мне ссылку')
  }

  if(text.includes('http') ||  text.includes('https')) {
    await bot.sendMessage(chatId, 'Минуточку, я думаю...')
    const quote = await axios('https://favqs.com/api/qotd')
     return bot.sendMessage(chatId, `Скоро я научусь отправялть ссылку на страничку со статьей, а пока вот тебе рандомная цитата:
     
  ${quote.data.quote.body}`)
  }
  return bot.sendMessage(chatId, 'Я тебя не понимаю, попробуй еще раз')
})