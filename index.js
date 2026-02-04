const mineflayer = require('mineflayer');
require('./keep_alive.js');

let bot = null;
let reconnectTimer = null;
let isRestarting = false;

const BOT_OPTIONS = {
  host: 'frankyowen.mcsh.io',
  port: 25565,
  username: 'IronSaza',
  version: '1.20.1'
};

function startBot() {
  if (bot) return;

  console.log('Starting bot...');
  bot = mineflayer.createBot(BOT_OPTIONS);

  bot.once('spawn', () => {
    console.log('Bot เข้าเซิร์ฟแล้ว');
    bot.chat('เข้าเกมแล้ว 🤖');

    // รีสตาร์ททุก 1 ชม.
    reconnectTimer = setTimeout(() => {
      restartBot('1 hour reconnect');
    }, 60 * 60 * 1000);
  });

  bot.on('kicked', reason => {
    console.log('KICKED:', reason);
    restartBot('kicked');
  });

  bot.on('end', () => {
    console.log('Disconnected');
    restartBot('disconnected');
  });

  bot.on('error', err => {
    console.log('ERROR:', err);
    // error บางแบบยังไม่หลุดจริง ไม่ restart ทันที
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
    try {
      bot.quit();
    } catch {}
    bot = null;
  }

  setTimeout(() => {
    isRestarting = false;
    startBot();
  }, 5000); // หน่วง 5 วิ กัน spam
}

// start ครั้งแรก
startBot();