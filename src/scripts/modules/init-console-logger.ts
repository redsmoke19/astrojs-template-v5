/**
 * Модуль для демонстрации работы скриптов
 * Выводит информацию о загрузке страницы в консоль
 */

import { log, logInfo, logSuccess, logWarning } from '../utils/logger';

/**
 * Инициализирует модуль логирования в консоль
 */
export function initConsoleLogger(): void {
  // Приветственное сообщение
  log('Astro Template v5 загружен!', {
    prefix: '🚀',
    color: '#4f46e5',
  });

  // Информация о странице
  logInfo(`Текущая страница: ${window.location.pathname}`);
  logInfo(`User Agent: ${navigator.userAgent.split(' ')[0]}...`);

  // Информация о времени загрузки
  if (window.performance && window.performance.timing) {
    window.addEventListener('load', () => {
      const loadTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
      logSuccess(`Страница загружена за ${loadTime}ms`);
    });
  }

  // Предупреждение для разработчиков
  if (import.meta.env.DEV) {
    logWarning('Режим разработки активен');
  }

  // Логируем размер окна
  const logWindowSize = () => {
    logInfo(`Размер окна: ${window.innerWidth}x${window.innerHeight}px`);
  };

  logWindowSize();

  // Отслеживаем изменение размера окна
  let resizeTimeout: number;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = window.setTimeout(logWindowSize, 500);
  });

  // Дополнительная информация
  console.group('📊 Информация о системе');
  console.table({
    'Язык браузера': navigator.language,
    'Платформа': navigator.platform,
    'Онлайн статус': navigator.onLine ? 'Онлайн' : 'Оффлайн',
    'Cookies включены': navigator.cookieEnabled ? 'Да' : 'Нет',
  });
  console.groupEnd();
}

