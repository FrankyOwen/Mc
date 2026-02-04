const mineflayer = require('mineflayer');
require('./keep_alive.js'); // ← แค่นี้พอ อย่าใส่ ()

const bot = mineflayer.createBot({
  host: '191.96.231.13',
  port: 13863,
  username: 'ChatBot',
  version: '1.20.1'
});

bot.once('spawn', () => {
  console.log('Bot เข้าเซิร์ฟแล้ว');
  bot.chat('เข้าเกมแล้ว 🤖');
});

bot.on('error', err => console.log('ERROR:', err));
bot.on('kicked', reason => console.log('KICKED:', reason));