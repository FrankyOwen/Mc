const keep_alive = require('./keep_alive.js');
const mineflayer = require("mineflayer");

keep_alive();

const bot = mineflayer.createBot({
  host: '191.96.231.13',
  port: 13863,
  username: 'ChatBot',
  version: '1.20.1' // ❗ Mineflayer ยังไม่รองรับ 1.21.x
});

bot.once('spawn', () => {
  bot.chat('เข้าเกมแล้ว 🤖');
});

bot.on('kicked', console.log);
bot.on('error', console.log);