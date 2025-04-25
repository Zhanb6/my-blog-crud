# my-blog-crud

Простой одностраничный блог с функционалом CRUD, реализованный на React + TypeScript с использованием Vite и Ant Design.

## 📦 Особенности проекта

- **CRUD для блог-постов**: создание, просмотр, редактирование и удаление записей с полями `title` и `text`.
- **Пагинация**: 10 записей на странице в списке постов.
- **Просмотр одной записи**: возможность отредактировать и удалить.
- **Имитация работы с базой**: искусственная задержка 500 мс при запросах и индикатор загрузки.
- **Уведомления**: оповещения об успешных и неудачных операциях.
- **FakeApi**: страница с получением и отображением данных из [JSONPlaceholder](https://jsonplaceholder.typicode.com/) с пагинацией.

## 🛠 Технологии

- **Роутинг**: React Router
- **HTTP-запросы**: Axios / Fetch API
- **UI**: Ant Design
- **Сборка**: Vite
- **Язык**: TypeScript

## 🚀 Установка и запуск

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/YOUR_USERNAME/my-blog-crud.git
   cd my-blog-crud
   ```
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Запустите dev-сервер:
   ```bash
   npm run dev
   ```
4. Откройте приложение в браузере по адресу, указанному в консоли (обычно `http://localhost:5173`).

## 📁 Структура проекта

```
my-blog-crud/
├─ public/
│  └─ index.html
├─ src/
│  ├─ api/            # слой для запросов (local и external)
│  ├─ components/     # общие UI-компоненты (Header, Loader, Notification)
│  ├─ pages/          # страницы приложения (PostsList, PostView, PostCreate, PostEdit, ExternalData)
│  ├─ types/          # определения TypeScript-интерфейсов
│  ├─ router.tsx      # маршрутизация
│  ├─ App.tsx         # корневой компонент
│  └─ main.tsx        # точка входа
├─ .gitignore
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

## 🤝 Вклад

PR и баг-репорты приветствуются! Пожалуйста, оформляйте изменения в отдельной ветке.

## 📝 Лицензия

Этот проект распространяется под лицензией MIT. Feel free to use and modify.

Вот и готовый проект

