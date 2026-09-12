import { useState } from "react";
import type { ProfileValue, ProfileValues } from "../data/profileFields";
import Field, { type ProfileFieldDef } from "./Field";

interface EditViewProps {
  fields: ProfileFieldDef[];
  values: ProfileValues;
  onChange: (name: string, value: ProfileValue) => void;
  isDisabled: (name: string) => boolean;
  isHidden: (name: string) => boolean;
  onSubmit: () => void;
  status: string | null;
  hasError?: boolean;
}

// EditView — форма редактирования профиля, для рендера использует Field
export default function EditView({
  fields,
  values,
  onChange,
  isDisabled,
  isHidden,
  onSubmit,
  status,
  hasError,
}: EditViewProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isEmptyValue = (value: ProfileValue | undefined) => {
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === "string") return value.trim() === "";
    return value === null || value === undefined || Number.isNaN(value);
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    fields.forEach((field) => {
      if (!field.required || isHidden(field.name) || isDisabled(field.name))
        return;
      if (isEmptyValue(values[field.name])) {
        nextErrors[field.name] =
          `Поле "${field.label}" обязательно для заполнения`;
      }
    });

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleFieldChange = (name: string, value: ProfileValue) => {
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    onChange(name, value);
  };

  return (
    <form
      className="grid gap-5 rounded-xl bg-white p-6 shadow-[0px_0px_15px_0px_#2643541A] md:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault();
        if (!validate()) return;
        onSubmit();
      }}
      noValidate
    >
      {fields.map((f) => (
        <Field
          key={f.name}
          field={f}
          value={values[f.name]}
          onChange={handleFieldChange}
          disabled={isDisabled(f.name)}
          hidden={isHidden(f.name)}
          error={errors[f.name]}
        />
      ))}
      <div className="md:col-span-2">
        <button
          type="submit"
          className="rounded bg-[#73C3F3] px-6 py-2 text-white hover:opacity-80"
        >
          Сохранить профиль
        </button>
        {status && (
          <p
            className={`mt-2 text-sm ${hasError ? "text-red-600" : "text-green-700"}`}
          >
            {status}
          </p>
        )}
        <p className="mt-2 text-xs text-slate-500">
          Связь полей: при выборе тарифа "Премиум" поле "Промокод" скрывается, а
          поле "Стоимость подписки" блокируется со значением 990. При уровне
          "Начинающий" блокируется поле "Цель на месяц (слов)".
        </p>
      </div>
    </form>
  );
}
