
module.exports = (bot, options) => {
    const settings = options.settings;
    const log = bot.sendLog;
    
    const UNLOCK_CODE = settings.unlockCode;
  
    if (!UNLOCK_CODE || UNLOCK_CODE.length < 4) {
      log('[Auto Unlocker] Внимание: Код для /unlock не задан или слишком короткий. Плагин не будет работать.');
      return;
    }
  
    log(`[Auto Unlocker] Плагин активирован. Код: ${UNLOCK_CODE.slice(0, 1)}***`);

    const handleUnlock = (rawMessageText) => {
      if (rawMessageText.includes('› Чтобы продолжить игру введите 4 последние цифры НОМЕРА КАРТЫ')) {
        try {
          log('[Auto Unlocker] Обнаружен запрос на ввод кода.');
          
          bot.api.sendMessage('command', `/unlock ${UNLOCK_CODE}`);

          bot.events.removeListener('core:raw_message', handleUnlock);

        } catch (error) {
          log(`[Auto Unlocker] Ошибка при отправке команды: ${error.message}`);
        }
      }
    }
  
    bot.events.on('core:raw_message', handleUnlock);
  
    bot.once('end', () => {
      bot.events.removeListener('core:raw_message', handleUnlock);
    });
};
