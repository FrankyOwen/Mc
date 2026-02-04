const mineflayer = require('mineflayer');
require('./keep_alive.js');

let bot = null;
let reconnectTimer = null;
let isRestarting = false;

const BOT_OPTIONS = {
  host: 'frankyowen.mcsh.io',
  port: 25565,
  username: 'Ipwhen',
  version: '1.20.1'
};

function startBot() {
  if (bot) return; // กัน login ซ้อน

  console.log('Starting bot...');
  bot = mineflayer.createBot(BOT_OPTIONS);

  bot.once('spawn', () => {
    console.log('Bot เข้าเซิร์ฟแล้ว');
    bot.chat('/create');

    // ตั้งเวลารีสตาร์ททุก 1 ชั่วโมง
    reconnectTimer = setTimeout(() => {
      restartBot('1 hour reconnect');
    }, 60 * 60 * 1000);
  });

  bot.on('kicked', reason => {
    console.log('KICKED:', reason);
    restartBot('kicked');
  });

  bot.on('error', err => {
    console.log('ERROR:', err);
  });

  bot.on('end', () => {
    console.log('Bot disconnected');
    bot = null;
  });
}

function restartBot(reason) {
  if (isRestarting) return;
  isRestarting = true;

  console.log(`Restarting bot (${reason})`);

  if (reconnectTimer) {
    clearTimeout(reconnectTimer);
    reconnectTimer = null;
  }

  if (bot) {
    bot.quit();
    bot = null;
  }

  setTimeout(() => {
    isRestarting = false;
    startBot();
  }, 5000); // เว้น 5 วิ กัน server มองว่า spam
}

// เริ่มครั้งแรก
startBot();