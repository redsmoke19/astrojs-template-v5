import { defineConfig } from 'astro/config';
import viteSassGlob from 'vite-plugin-sass-glob-import';
import { fileURLToPath } from 'node:url';
import icon from 'astro-icon';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  devToolbar: { enabled: false },
  compressHTML: false,
  output: 'static',
  publicDir: './public',
  build: {
    format: 'file', // вытаскивает вложенные страницы в корень src/pages/subpage/subpage.html => dist/subpage.html
    assets: 'assets', // собирает скрипты и стили в папку dist/assets
    assetsPrefix: '.' // добавляет `.` в пути скриптов и стилей
  },
  integrations: [
    icon({
      include: {
        // Указываем локальную коллекцию
        local: ['*']
      },
      svgoOptions: {
        plugins: ['preset-default']
      }
    })
  ],
  vite: {
    plugins: [viteSassGlob(), tailwindcss()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData: `@use "@/styles/global/variables" as *;`
        }
      }
    },
    build: {
      assetsInlineLimit: 0, // запрещает инлайн скриптов. по дефолту инлайнит скрипты в html
      cssCodeSplit: false, // css в один файл
      rollupOptions: {
        output: {
          entryFileNames: 'scripts.js',
          assetFileNames: (assetInfo) => {
            return assetInfo.name === 'style.css'
              ? `${assetInfo.name}` // задается имя и папка (корень) для css
              : `assets/[name][extname]`; // задается имя и папка для всех остальных ресурсов
          }
        }
      }
    }
  }
});