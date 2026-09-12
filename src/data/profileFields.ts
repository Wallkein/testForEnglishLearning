import type { ProfileFieldDef } from "../components/Field";

export type ProfileValue = string | number | string[];
export type ProfileValues = Record<string, ProfileValue>;

// Поля профиля: строки, числа, текст, дата, select, checkbox-группы, radio-группы
export const PROFILE_FIELDS: ProfileFieldDef[] = [
  {
    name: "firstName",
    label: "Имя",
    type: "string",
    placeholder: "Иван",
    required: true,
  },
  {
    name: "lastName",
    label: "Фамилия",
    type: "string",
    placeholder: "Петров",
    required: true,
  },
  {
    name: "middleName",
    label: "Отчество",
    type: "string",
    placeholder: "Иванович",
  },
  {
    name: "nickname",
    label: "Никнейм",
    type: "string",
    placeholder: "english_learner",
  },
  { name: "age", label: "Возраст", type: "number" },
  { name: "wordsPerDay", label: "Слов в день", type: "number" },
  { name: "monthlyGoal", label: "Цель на месяц, слов", type: "number" },
  {
    name: "email",
    label: "Email",
    type: "string",
    placeholder: "you@mail.com",
  },
  {
    name: "city",
    label: "Город",
    type: "string",
    placeholder: "Москва",
  },
  {
    name: "about",
    label: "О себе",
    type: "text",
    placeholder: "Люблю английский...",
  },
  { name: "birthDate", label: "Дата рождения", type: "date" },
  { name: "startDate", label: "Дата начала обучения", type: "date" },
  {
    name: "level",
    label: "Уровень английского",
    type: "select",
    options: ["Начинающий", "Средний", "Продвинутый"],
  },
  {
    name: "tariff",
    label: "Тариф",
    type: "select",
    options: ["Бесплатный", "Премиум"],
  },
  {
    name: "promo",
    label: "Промокод",
    type: "string",
    placeholder: "SALE-2026",
  },
  {
    name: "subscriptionPrice",
    label: "Стоимость подписки",
    type: "number",
  },
  {
    name: "topics",
    label: "Интересные темы",
    type: "checkbox",
    options: ["Путешествия", "Работа", "Кино", "Спорт"],
  },
  {
    name: "notifications",
    label: "Уведомления",
    type: "checkbox",
    options: ["Email", "SMS", "Push"],
  },
  {
    name: "studyTime",
    label: "Время занятий",
    type: "radio",
    options: ["Утро", "День", "Вечер"],
  },
  {
    name: "format",
    label: "Формат обучения",
    type: "radio",
    options: ["Карточки", "Тесты", "Аудио"],
  },
];

export const PROFILE_DEFAULTS: ProfileValues = {
  firstName: "",
  lastName: "",
  middleName: "",
  level: "Средний",
  tariff: "Бесплатный",
  subscriptionPrice: 0,
  topics: ["Кино"],
  notifications: ["Push"],
  studyTime: "Вечер",
  format: "Карточки",
};
