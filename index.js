import mineflayer from 'mineflayer';
import keep_alive from './keep_alive.js';

keep_alive(); // 👈 เรียกใช้งาน keep alive

const bot = mineflayer.createBot({
  host: '191.96.231.13',
  port: 13863,
  username: 'ChatBot',
  version: '1.20.1' // ✅ เวอร์ชันที่ Mineflayer รองรับ
});

bot.once('spawn', () => {
  console.log('Bot เข้าเกมแล้ว');
  bot.chat('เข้าเกมแล้ว 🤖');
});

bot.on('chat', (username, message) => {
  if (username === bot.username) return;

  if (message === 'ping') {
    bot.chat('pong');
  }
});

bot.on('error', err => console.log('Error:', err));
bot.on('end', () => console.log('Bot หลุดออกจากเซิร์ฟเวอร์'));