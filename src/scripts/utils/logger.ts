/**
 * Утилитарная функция для логирования с красивым форматированием
 */

/* eslint-disable no-console */

export interface LoggerOptions {
  prefix?: string;
  color?: string;
  emoji?: string;
}

/**
 * Логирует сообщение в консоль с форматированием
 */
export function log(message: string, options: LoggerOptions = {}): void {
  const { prefix = '🚀', color = '#4f46e5', emoji = '' } = options;

  const style = `
    color: ${color};
    font-weight: bold;
    font-size: 14px;
    padding: 4px 8px;
    border-radius: 4px;
    background: ${color}15;
  `;

  console.log(`%c${prefix} ${emoji} ${message}`, style);
}

/**
 * Логирует информационное сообщение
 */
export function logInfo(message: string): void {
  log(message, {
    prefix: 'ℹ️',
    color: '#06b6d4',
    emoji: 'INFO',
  });
}

/**
 * Логирует сообщение об успехе
 */
export function logSuccess(message: string): void {
  log(message, {
    prefix: '✅',
    color: '#10b981',
    emoji: 'SUCCESS',
  });
}

/**
 * Логирует предупреждение
 */
export function logWarning(message: string): void {
  log(message, {
    prefix: '⚠️',
    color: '#f59e0b',
    emoji: 'WARNING',
  });
}

/**
 * Логирует ошибку
 */
export function logError(message: string): void {
  log(message, {
    prefix: '❌',
    color: '#ef4444',
    emoji: 'ERROR',
  });
}

