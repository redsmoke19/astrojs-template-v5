# 🚀 Astro Template v5

Современный шаблон проекта для Astro.js v5 с полной поддержкой TypeScript, SCSS и всех необходимых инструментов для профессиональной разработки.

## ✨ Возможности

- ⚡ **Astro v5** - Последняя версия фреймворка
- 🎨 **Tailwind CSS v4** - Утилитарный CSS фреймворк с новым движком
- 🎨 **SCSS** - Препроцессор с переменными, миксинами и глобальными импортами
- 📘 **TypeScript 5.x** - Строгая типизация с поддержкой алиасов путей
- 📜 **Модульные скрипты** - Организованная структура для клиентских скриптов
- 🔍 **Линтеры** - ESLint 9, Prettier, Stylelint
- 🧩 **Генератор компонентов** - Автоматическое создание структуры компонентов
- 📦 **Swiper** - Библиотека для слайдеров и каруселей
- 🎯 **astro-icon** - Поддержка SVG иконок
- 🔒 **scroll-lock** - Управление прокруткой страницы
- 🛠️ **Autoprefixer & PostCSS** - Автоматическая обработка CSS

## 📦 Установка

```bash
# Установка зависимостей
npm install
```

## 🚀 Использование

### Команды разработки

```bash
# Запуск dev-сервера на localhost:4321
npm run dev

# Запуск dev-сервера с доступом из сети
npm run start

# Сборка проекта для production
npm run build

# Предварительный просмотр production сборки
npm run preview
```

### Линтеры

```bash
# Запуск всех линтеров
npm run lint

# Форматирование кода с Prettier
npm run lint:prettier

# Проверка JavaScript/TypeScript с ESLint
npm run lint:eslint

# Проверка SCSS с Stylelint
npm run lint:stylelint
```

### Генератор компонентов

```bash
# Создание нового компонента
npm run gen:component ComponentName

# Пример: создание компонента Hero
npm run gen:component Hero
```

Генератор создаст следующую структуру:

```
src/components/Hero/
├── Hero.astro          # Основной файл компонента
├── Hero.scss           # Стили компонента
└── Hero.types.ts       # TypeScript типы
```

## 📁 Структура проекта

```
/
├── public/             # Статические файлы
├── src/
│   ├── assets/        # Изображения, шрифты и т.д.
│   ├── components/    # Компоненты Astro
│   │   ├── Button/          # SCSS компоненты
│   │   ├── Card/
│   │   ├── TailwindButton/  # Tailwind компоненты
│   │   └── TailwindCard/
│   ├── layouts/       # Макеты страниц
│   │   └── Main.astro
│   ├── pages/         # Страницы сайта
│   │   ├── index.astro
│   │   └── tailwind-demo.astro
│   ├── scripts/       # Клиентские скрипты
│   │   ├── index.ts         # Главный файл скриптов
│   │   ├── modules/         # Модули и фичи
│   │   └── utils/           # Утилитарные функции
│   └── styles/        # Глобальные стили
│       ├── global.css       # Tailwind импорт
│       ├── _variables.scss  # SCSS переменные
│       ├── _mixins.scss     # SCSS миксины
│       └── global.scss      # Глобальные SCSS стили
├── util/
│   └── component/
│       └── gen-component.js # Скрипт генерации компонентов
├── astro.config.mjs   # Конфигурация Astro
├── tailwind.config.js # Конфигурация Tailwind CSS
├── tsconfig.json      # Конфигурация TypeScript
├── eslint.config.js   # Конфигурация ESLint
├── .prettierrc.cjs    # Конфигурация Prettier
└── .stylelintrc.cjs   # Конфигурация Stylelint
```

## 🎨 Работа со стилями

### Tailwind CSS v4

Проект использует Tailwind CSS v4 с новым движком на основе Lightning CSS:

```astro
---
// Компонент с Tailwind классами
---

<div class="p-lg bg-primary text-white rounded-md shadow-lg hover:shadow-xl transition-all">
  <h2 class="text-2xl font-bold mb-md">Заголовок</h2>
  <p class="text-gray-100">Контент с использованием Tailwind</p>
</div>
```

#### Кастомные значения

В `tailwind.config.js` настроены кастомные цвета и отступы из SCSS переменных:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#4f46e5',
      secondary: '#06b6d4',
      accent: '#f59e0b',
    },
    spacing: {
      xs: '4px',
      sm: '8px',
      md: '16px',
      // ...
    }
  }
}
```

### SCSS переменные

Все переменные находятся в `src/styles/_variables.scss`:

```scss
// Использование в компоненте
@use '@/styles/global/variables' as *;

.my-component {
  color: $color-primary;
  padding: $spacing-md;
}
```

### SCSS миксины

Миксины находятся в `src/styles/_mixins.scss`:

```scss
@use '@/styles/global/mixins' as *;

.my-component {
  @include flex-center;
  @include media-md {
    // Стили для экранов >= 768px
  }
}
```

### Глобальные стили

Глобальные стили автоматически импортируются в `Main.astro`:

```astro
---
import '@/styles/global.scss';
---
```

## 🔧 Конфигурация

### Алиасы путей

В проекте настроены алиасы для удобного импорта:

```typescript
// Вместо относительных путей
import Main from '../../../layouts/Main.astro';

// Используйте алиасы
import Main from '@/layouts/Main.astro';
```

### Autoprefixer

Автоматически добавляет вендорные префиксы к CSS свойствам.

### Vite плагины

- `vite-plugin-sass-glob-import` - Поддержка glob импортов в SCSS

## 📜 Работа со скриптами

Проект использует модульную структуру для организации клиентских скриптов.

### Структура

```
src/scripts/
├── index.ts              # Главный файл, аккумулирующий все модули
├── modules/              # Основные модули и фичи
│   └── init-*.ts        # Модули с init-функциями
└── utils/               # Утилитарные функции
    └── *.ts             # Вспомогательные функции
```

### Создание нового модуля

1. Создайте файл в `src/scripts/modules/` с префиксом `init-`:

```typescript
// src/scripts/modules/init-my-feature.ts
export function initMyFeature(): void {
  console.log('My feature initialized!');
}
```

2. Импортируйте и вызовите в `src/scripts/index.ts`:

```typescript
import { initMyFeature } from './modules/init-my-feature';

function initScripts(): void {
  initMyFeature();
  // другие модули...
}
```

### Утилитарные функции

Создавайте переиспользуемые функции в `src/scripts/utils/`:

```typescript
// src/scripts/utils/my-util.ts
export function myUtil(param: string): void {
  // Ваша логика
}
```

Используйте в модулях:

```typescript
import { myUtil } from '../utils/my-util';
```

### Подключение

Скрипты автоматически подключаются через `Main.astro`:

```astro
<script src="@/scripts/index.ts"></script>
```

Astro автоматически обрабатывает TypeScript и бандлит скрипты.

Подробнее см. в `src/scripts/README.md`.

## 📚 Зависимости

### Production

- `astro` ^5.15.3
- `pathe` ^1.1.2 - Кроссплатформенная работа с путями
- `scroll-lock` ^2.1.5 - Управление прокруткой
- `swiper` ^11.1.15 - Слайдеры и карусели

### Development

- `@tailwindcss/vite` ^4.1.16 - Vite плагин для Tailwind v4
- `tailwindcss` ^4.1.16 - Tailwind CSS v4
- `astro-icon` ^1.1.5 - SVG иконки
- `@typescript-eslint/parser` ^8.18.1
- `autoprefixer` ^10.4.20
- `eslint` ^9.17.0
- `eslint-plugin-astro` ^1.3.2
- `postcss` ^8.4.49
- `prettier` ^3.4.2
- `prettier-plugin-astro` ^0.15.0
- `sass` ^1.83.0
- `stylelint` ^16.11.0
- `stylelint-config-htmlacademy` ^4.0.1
- `stylelint-scss` ^6.10.0
- `typescript` ^5.7.2
- `vite-plugin-sass-glob-import` ^3.0.2

## 🌟 Примеры использования

### Создание компонента с SCSS

```astro
---
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<div class="my-component">
  <h2>{title}</h2>
</div>

<style lang="scss">
  @use '@/styles/global/variables' as *;
  @use '@/styles/global/mixins' as *;

  .my-component {
    padding: $spacing-lg;
    background: $color-background-alt;
    border-radius: $border-radius-md;

    @include media-md {
      padding: $spacing-xl;
    }
  }
</style>
```

### Использование иконок

```astro
---
import { Icon } from 'astro-icon/components';
---

<Icon name="mdi:home" />
```

## 📝 Лицензия

MIT

## 🤝 Вклад

Если вы нашли ошибку или хотите предложить улучшение, создайте issue или pull request.

---

Создано с ❤️ для современной веб-разработки
