/**
 * Главный файл скриптов
 * Импортирует и инициализирует все модули
 *
 * @example Добавление нового модуля:
 * 1. Создайте файл: src/scripts/modules/init-my-feature.ts
 * 2. Экспортируйте функцию: export function initMyFeature(): void { ... }
 * 3. Импортируйте здесь: import { initMyFeature } from './modules/init-my-feature';
 * 4. Вызовите в initScripts(): initMyFeature();
 */

// Импорт модулей
import { initConsoleLogger } from './modules/init-console-logger'
// import { initSmoothScroll } from './modules/init-smooth-scroll';

/**
 * Главная функция инициализации всех скриптов
 */
function initScripts(): void {
  // Проверяем, что мы в браузере
  if (typeof window === 'undefined') {
    return
  }

  // Инициализируем модули
  initConsoleLogger()
  // initSmoothScroll(); // Раскомментируйте для активации плавной прокрутки

  // Здесь можно добавить инициализацию других модулей:
  // initAnotherModule();
  // initYetAnotherModule();
}

// Запускаем инициализацию при загрузке DOM
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScripts)
} else {
  // DOM уже загружен
  initScripts()
}

// Экспортируем для возможного использования извне
export { initScripts }
