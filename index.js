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
  if (bot || isRestarting) return;

  console.log('[BOT] Starting...');
  bot = mineflayer.createBot(BOT_OPTIONS);

  bot.once('spawn', () => {
    console.log('[BOT] Spawned');
    bot.chat('เข้าเกมแล้ว 🤖');

    // รีสตาร์ททุก 1 ชั่วโมง
    reconnectTimer = setTimeout(() => {
      restartBot('1 hour reconnect', 5000);
    }, 60 * 60 * 1000);
  });

  bot.on('kicked', reason => {
    const msg =
      typeof reason === 'string'
        ? reason
        : reason?.text || JSON.stringify(reason);

    console.log('[BOT] KICKED:', msg);

    if (
      msg.includes('still starting') ||
      msg.includes('failed to start')
    ) {
      // เซิร์ฟยัง boot อยู่ → รอนานขึ้น
      restartBot('server starting', 60000);
    } else {
      restartBot('kicked', 5000);
    }
  });

  bot.on('end', () => {
    console.log('[BOT] Disconnected');
    restartBot('disconnected', 5000);
  });

  bot.on('error', err => {
    console.log('[BOT] ERROR:', err?.message || err);
  });
}

function restartBot(reason, delay = 5000) {
  if (isRestarting) return;
  isRestarting = true;

  console.log(`[BOT] Restarting (${reason}) in ${delay / 1000}s`);

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
  }, delay);
}

// เริ่มครั้งแรก
startBot();