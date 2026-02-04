import mineflayer from 'mineflayer';
const keep_alive = require('./keep_alive.js');
const bot = mineflayer.createBot({
  host: 'localhost',   // IP / domain server
  port: 25565,
  username: 'ChatBot',
  version: '1.20.4'    // 👈 ใส่เวอร์ชัน Minecraft ตรงนี้
});

bot.once('spawn', () => {
  bot.chat('เข้าเกมแล้ว');
});
