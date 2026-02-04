import mineflayer from 'mineflayer';
const keep_alive = require('./keep_alive.js');
const bot = mineflayer.createBot({
  host: '191.96.231.13',   // IP / domain server
  port: 13863,
  username: 'ChatBot',
  version: '1.21.11'    // 👈 ใส่เวอร์ชัน Minecraft ตรงนี้
});

bot.once('spawn', () => {
  bot.chat('เข้าเกมแล้ว');
});
