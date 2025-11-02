# Примеры использования скриптов

## Использование утилит логирования

```typescript
import { log, logInfo, logSuccess, logWarning, logError } from '@/scripts/utils/logger'

// Базовое логирование с кастомизацией
log('Приложение запущено', {
  prefix: '🚀',
  color: '#4f46e5'
})

// Информационное сообщение
logInfo('Загрузка данных...')

// Успешное выполнение
logSuccess('Данные загружены успешно!')

// Предупреждение
logWarning('Использование устаревшего API')

// Ошибка
logError('Не удалось загрузить данные')
```

## Использование DOM утилит

```typescript
import { qs, qsa, isInViewport, debounce, throttle } from '@/scripts/utils/dom'

// Безопасный querySelector с типизацией
const button = qs<HTMLButtonElement>('.my-button')
if (button) {
  button.addEventListener('click', () => {
    console.log('Кнопка нажата')
  })
}

// Получение всех элементов
const items = qsa<HTMLElement>('.item')
items.forEach((item) => {
  console.log(item.textContent)
})

// Проверка видимости элемента
const hero = qs('.hero')
if (hero && isInViewport(hero)) {
  console.log('Hero секция видна')
}

// Debounce для поиска
const searchInput = qs<HTMLInputElement>('#search')
if (searchInput) {
  const handleSearch = debounce((value: string) => {
    console.log('Поиск:', value)
    // Выполнить поиск
  }, 300)

  searchInput.addEventListener('input', (e) => {
    handleSearch((e.target as HTMLInputElement).value)
  })
}

// Throttle для scroll событий
const handleScroll = throttle(() => {
  console.log('Scroll position:', window.scrollY)
}, 100)

window.addEventListener('scroll', handleScroll)
```

## Создание нового модуля

### Пример: Модуль для отслеживания кликов

```typescript
// src/scripts/modules/init-click-tracker.ts
import { logInfo } from '../utils/logger'
import { qs } from '../utils/dom'

export function initClickTracker(): void {
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement

    // Отслеживаем клики по кнопкам
    if (target.tagName === 'BUTTON') {
      logInfo(`Клик по кнопке: ${target.textContent}`)
    }

    // Отслеживаем клики по ссылкам
    if (target.tagName === 'A') {
      const href = target.getAttribute('href')
      logInfo(`Клик по ссылке: ${href}`)
    }
  })
}
```

Затем добавьте в `src/scripts/index.ts`:

```typescript
import { initClickTracker } from './modules/init-click-tracker'

function initScripts(): void {
  // ...
  initClickTracker()
}
```

### Пример: Модуль для lazy loading изображений

```typescript
// src/scripts/modules/init-lazy-images.ts
import { qsa, isInViewport } from '../utils/dom'
import { logSuccess } from '../utils/logger'

export function initLazyImages(): void {
  const images = qsa<HTMLImageElement>('img[data-src]')

  if (images.length === 0) {
    return
  }

  const loadImage = (img: HTMLImageElement) => {
    const src = img.getAttribute('data-src')
    if (src) {
      img.src = src
      img.removeAttribute('data-src')
      logSuccess(`Изображение загружено: ${src}`)
    }
  }

  const checkImages = () => {
    images.forEach((img) => {
      if (isInViewport(img) && img.hasAttribute('data-src')) {
        loadImage(img)
      }
    })
  }

  // Проверяем при загрузке
  checkImages()

  // Проверяем при прокрутке
  window.addEventListener('scroll', checkImages)
  window.addEventListener('resize', checkImages)
}
```

### Пример: Модуль для темной темы

```typescript
// src/scripts/modules/init-theme-switcher.ts
import { qs } from '../utils/dom'
import { logInfo } from '../utils/logger'

export function initThemeSwitcher(): void {
  const THEME_KEY = 'theme'
  const toggleButton = qs<HTMLButtonElement>('[data-theme-toggle]')

  if (!toggleButton) {
    return
  }

  // Получаем сохраненную тему
  const savedTheme = localStorage.getItem(THEME_KEY) || 'light'
  document.documentElement.setAttribute('data-theme', savedTheme)

  // Обработчик переключения
  toggleButton.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme')
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'

    document.documentElement.setAttribute('data-theme', newTheme)
    localStorage.setItem(THEME_KEY, newTheme)

    logInfo(`Тема изменена на: ${newTheme}`)
  })
}
```

## Работа с асинхронными операциями

```typescript
// src/scripts/modules/init-data-loader.ts
import { logInfo, logSuccess, logError } from '../utils/logger'
import { waitForDOMReady } from '../utils/dom'

export async function initDataLoader(): Promise<void> {
  await waitForDOMReady()

  try {
    logInfo('Загрузка данных...')

    const response = await fetch('/api/data')
    const data = await response.json()

    logSuccess('Данные загружены успешно')
    console.log(data)
  } catch (error) {
    logError('Ошибка при загрузке данных')
    console.error(error)
  }
}
```

## Best Practices

### 1. Проверка существования элементов

```typescript
const element = qs('.my-element')
if (!element) {
  return // Элемент не найден, выходим
}

// Работаем с элементом
element.classList.add('active')
```

### 2. Очистка event listeners

```typescript
export function initMyModule(): void {
  const handleResize = () => {
    console.log('Resize')
  }

  window.addEventListener('resize', handleResize)

  // Очистка при необходимости
  // window.removeEventListener('resize', handleResize);
}
```

### 3. Использование debounce/throttle

```typescript
import { debounce, throttle } from '../utils/dom'

// Используйте debounce для событий, которые должны выполниться один раз после завершения
const handleInput = debounce((value: string) => {
  // Поиск, валидация и т.д.
}, 300)

// Используйте throttle для событий, которые должны выполняться регулярно
const handleScroll = throttle(() => {
  // Обновление UI, анимации и т.д.
}, 100)
```

### 4. Типизация

```typescript
// Всегда используйте типизацию для TypeScript
const button = qs<HTMLButtonElement>('.button')
const inputs = qsa<HTMLInputElement>('input[type="text"]')

// Типизация для собственных функций
function processData(data: string[]): void {
  data.forEach((item) => console.log(item))
}
```

### 5. Модульность

Разделяйте логику на небольшие, переиспользуемые функции:

```typescript
// ❌ Плохо - всё в одной функции
export function initComplexFeature(): void {
  // 200 строк кода...
}

// ✅ Хорошо - разделено на функции
function setupEventListeners(): void {
  // ...
}

function loadData(): Promise<void> {
  // ...
}

function renderUI(data: unknown): void {
  // ...
}

export function initComplexFeature(): void {
  setupEventListeners()
  loadData().then(renderUI)
}
```
