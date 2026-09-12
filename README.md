# EnglishCards — SPA для изучения английских слов

Стек: React + Redux Toolkit + TypeScript + Vite + Tailwind CSS.

## Запуск

```bash
npm install
npm run dev
```

Сборка:

```bash
npm run build
npm run preview
```

## Разрешение экрана

От 1152px до 375px

## Маршруты

- `/` — главная (абстрактная информация о проекте)
- `/login` — форма входа, логин/пароль: `admin/admin`, ошибка при неверных данных
- `/cards` — карточки (только для авторизованных, редирект на `/login` без входа)
- `/profile` — форма профиля из 20 полей (только для авторизованных)

## Иерархия компонентов

- `Page` (src/components/Page.tsx) — страница целиком
- `Header` (пропсы: `user`, `onLogout`) — фейк-профиль
- `Footer` (пропсы: `contacts`) — фейк-контакты
- `Body` — полезная нагрузка
- `CardList` (пропсы: `cards: WordCard[]`) → `Card` (пропсы: `card`)
- `EditView` (пропсы: `fields`, `values`, ...) → `Field`

## Состояние

- Redux Toolkit: `src/store/authSlice.ts` (login/logout, `loginThunk` через мок-API)
- `React.useState`: переворот карточек, значения формы профиля, загрузка списков

## Данные (мок)

- `src/data/words.ts` — **массив** слов + рандомные мотивационные заголовки
- `src/services/api.ts` — `mockLogin`, `mockFetchWords`, `mockSaveProfile` с имитацией задержки.
  Легко заменить на `fetch` к `mockable.io` / `postman-echo`.

## Карточки

Лицевая сторона: заголовок (рандомно), транскрипция, часть речи, пример, кнопка LEARN MORE.
По клику — 3D-переворот (CSS-анимация `flip-inner`, классы в `index.css`) и перевод; повторный клик — назад.

## Профиль (20 полей)

Типы: число (`age`, `wordsPerDay`, `monthlyGoal`, `subscriptionPrice`), строка
(`firstName`, `lastName`, `nickname`, `email`, `city`, `promo`, `middleName`), текст (`about`),
дата (`birthDate`, `startDate`), список (`level`, `tariff`), checkbox-группы (`topics`,
`notifications`), radiogroup (`studyTime`, `format`).

Связь полей:

- поле "а" = `tariff`. При `tariff === 'Премиум'`:
- поле "б" = `promo` **скрывается**;
- поле "в" = `subscriptionPrice` **блокируется** и получает значение `990`.
- Дополнительно: при `level === 'Начинающий'` блокируется `monthlyGoal`.

## Ответы на теорию

Папка `Ответы на вопросы/`.
