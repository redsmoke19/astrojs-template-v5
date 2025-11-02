import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Получаем имя компонента из аргументов командной строки
const componentName = process.argv[2]

if (!componentName) {
  console.error('❌ Ошибка: Укажите имя компонента')
  console.log('Использование: npm run gen:component ComponentName')
  process.exit(1)
}

// Проверяем, что имя компонента начинается с заглавной буквы
if (!/^[A-Z]/.test(componentName)) {
  console.error('❌ Ошибка: Имя компонента должно начинаться с заглавной буквы')
  process.exit(1)
}

// Путь к директории компонентов
const componentsDir = path.join(__dirname, '../../src/components')
const componentDir = path.join(componentsDir, componentName)

// Проверяем, существует ли уже такой компонент
if (fs.existsSync(componentDir)) {
  console.error(`❌ Ошибка: Компонент "${componentName}" уже существует`)
  process.exit(1)
}

// Создаём директорию компонента
fs.mkdirSync(componentDir, { recursive: true })

// Шаблон Astro компонента
const astroTemplate = `---
interface Props {
  className?: string;
}

const { className = '' } = Astro.props;
---

<div class:list={['${componentName.toLowerCase()}', className]}>
  <h2>${componentName} Component</h2>
  <p>Это новый компонент ${componentName}</p>
</div>

<style lang="scss">
  @use '@/assets/styles/global/variables' as *;
  @use '@/assets/styles/global/mixins' as *;

  .${componentName.toLowerCase()} {
    padding: $spacing-md;
    background-color: $color-background-alt;
    border-radius: $border-radius-md;

    h2 {
      color: $color-primary;
      margin-bottom: $spacing-sm;
    }

    p {
      color: $color-text-light;
      margin-bottom: 0;
    }
  }
</style>
`

// Шаблон SCSS файла (опционально, если нужны отдельные стили)
const scssTemplate = `@use '@/assets/styles/global/variables' as *;
@use '@/assets/styles/global/mixins' as *;

.${componentName.toLowerCase()} {
  padding: $spacing-md;
  background-color: $color-background-alt;
  border-radius: $border-radius-md;

  &__title {
    color: $color-primary;
    margin-bottom: $spacing-sm;
  }

  &__content {
    color: $color-text-light;
  }
}
`

// Шаблон TypeScript типов (опционально)
const typesTemplate = `export interface ${componentName}Props {
  className?: string;
  title?: string;
  children?: any;
}
`

// Создаём файлы
const astroFile = path.join(componentDir, `${componentName}.astro`)
const scssFile = path.join(componentDir, `${componentName}.scss`)
const typesFile = path.join(componentDir, `${componentName}.types.ts`)

try {
  // Создаём основной .astro файл
  fs.writeFileSync(astroFile, astroTemplate)
  console.log(`✅ Создан файл: ${componentName}.astro`)

  // Создаём SCSS файл (опционально)
  fs.writeFileSync(scssFile, scssTemplate)
  console.log(`✅ Создан файл: ${componentName}.scss`)

  // Создаём файл типов (опционально)
  fs.writeFileSync(typesFile, typesTemplate)
  console.log(`✅ Создан файл: ${componentName}.types.ts`)

  console.log(`\n🎉 Компонент "${componentName}" успешно создан в src/components/${componentName}/`)
  console.log(
    `\nИспользование:\n  import ${componentName} from '@/components/${componentName}/${componentName}.astro';\n`
  )
} catch (error) {
  console.error('❌ Ошибка при создании компонента:', error.message)
  process.exit(1)
}
