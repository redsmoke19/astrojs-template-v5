/**
 * Модуль для плавной прокрутки к якорям
 * Добавляет плавную анимацию при клике на ссылки с якорями (#)
 */

import { logInfo } from '../utils/logger';

/**
 * Инициализирует плавную прокрутку для якорных ссылок
 */
export function initSmoothScroll(): void {
  // Находим все ссылки с якорями
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  if (anchorLinks.length === 0) {
    return;
  }

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');

      // Игнорируем пустые якоря
      if (!href || href === '#') {
        return;
      }

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        e.preventDefault();

        // Плавная прокрутка к элементу
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });

        // Обновляем URL без перезагрузки страницы
        if (history.pushState) {
          history.pushState(null, '', href);
        }
      }
    });
  });

  logInfo(`Плавная прокрутка активирована для ${anchorLinks.length} ссылок`);
}

