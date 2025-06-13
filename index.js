module.exports = function(bot, settings, log) {
    const UNLOCK_CODE = settings.unlockCode;
  
    if (!UNLOCK_CODE || UNLOCK_CODE.length < 4) {
      log('[Auto Unlocker] Внимание: Код для /unlock не задан или слишком короткий в настройках плагина. Плагин не будет работать.');
      return;
    }
  
    log(`[Auto Unlocker] Плагин активирован.`);
  
    async function handleUnlock(message) {
      if (message.includes('› Чтобы продолжить игру введите 4 последние цифры НОМЕРА КАРТЫ')) {
        try {
          log('[Auto Unlocker] Обнаружен запрос на ввод кода. Отправляю команду...');
          await bot.api.sendMessage('command', `/unlock ${UNLOCK_CODE}`);
          log(`[Auto Unlocker] Команда /unlock ${UNLOCK_CODE} успешно отправлена.`);
        } catch (error) {
          log(`[Auto Unlocker] Ошибка при отправке команды: ${error.message}`);
        }
      }
    }
  
    bot.on('message', handleUnlock);
  
    return () => {
      bot.off('message', handleUnlock);
      log('[Auto Unlocker] Плагин деактивирован.');
    };
  };