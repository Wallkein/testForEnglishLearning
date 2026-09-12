import type { ProfileValue } from "../data/profileFields";

export type FieldType =
  | "string"
  | "number"
  | "text"
  | "date"
  | "select"
  | "checkbox"
  | "radio";

export interface ProfileFieldDef {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  placeholder?: string;
  required?: boolean;
}

export interface FieldProps {
  field: ProfileFieldDef;
  value: ProfileValue | undefined;
  onChange: (name: string, value: ProfileValue) => void;
  disabled?: boolean;
  hidden?: boolean;
  error?: string;
}

// Field — рендер одного поля по конфигу
export default function Field({
  field,
  value,
  onChange,
  disabled,
  hidden,
  error,
}: FieldProps) {
  if (hidden) return null;

  const fieldId = `profile-${field.name}`;
  const errorId = error ? `${fieldId}-error` : undefined;

  const common =
    "w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 resize-none";
  const errorCls = error
    ? " border-red-500 focus:ring-red-500"
    : " border-slate-300 focus:ring-indigo-500";
  const disabledCls = disabled
    ? " bg-slate-100 text-slate-500 cursor-not-allowed"
    : " bg-white";

  const label = (
    <label
      htmlFor={fieldId}
      className="mb-1 block text-sm font-medium text-slate-700"
    >
      {field.label}
      {field.required && <span className="text-red-500"> *</span>}
    </label>
  );

  const errorMessage = error ? (
    <p id={errorId} className="mt-1 text-xs text-red-600">
      {error}
    </p>
  ) : null;

  switch (field.type) {
    case "string":
      return (
        <div>
          {label}
          <input
            id={fieldId}
            name={field.name}
            type="text"
            className={common + errorCls + disabledCls}
            value={typeof value === "string" ? value : ""}
            placeholder={field.placeholder}
            disabled={disabled}
            required={field.required}
            aria-invalid={Boolean(error)}
            aria-describedby={errorId}
            onChange={(e) => onChange(field.name, e.target.value)}
          />
          {errorMessage}
        </div>
      );
    case "number":
      return (
        <div>
          {label}
          <input
            id={fieldId}
            name={field.name}
            type="number"
            className={common + errorCls + disabledCls}
            value={typeof value === "number" ? value : ""}
            disabled={disabled}
            required={field.required}
            aria-invalid={Boolean(error)}
            aria-describedby={errorId}
            onChange={(e) => onChange(field.name, e.target.valueAsNumber)}
          />
          {errorMessage}
        </div>
      );
    case "text":
      return (
        <div>
          {label}
          <textarea
            id={fieldId}
            name={field.name}
            className={common + errorCls + disabledCls}
            rows={3}
            value={typeof value === "string" ? value : ""}
            placeholder={field.placeholder}
            disabled={disabled}
            required={field.required}
            aria-invalid={Boolean(error)}
            aria-describedby={errorId}
            onChange={(e) => onChange(field.name, e.target.value)}
          />
          {errorMessage}
        </div>
      );
    case "date":
      return (
        <div>
          {label}
          <input
            id={fieldId}
            name={field.name}
            type="date"
            className={common + errorCls + disabledCls}
            value={typeof value === "string" ? value : ""}
            disabled={disabled}
            required={field.required}
            aria-invalid={Boolean(error)}
            aria-describedby={errorId}
            onChange={(e) => onChange(field.name, e.target.value)}
          />
          {errorMessage}
        </div>
      );
    case "select":
      return (
        <div>
          {label}
          <select
            id={fieldId}
            name={field.name}
            className={common + errorCls + disabledCls}
            value={typeof value === "string" ? value : ""}
            disabled={disabled}
            required={field.required}
            aria-invalid={Boolean(error)}
            aria-describedby={errorId}
            onChange={(e) => onChange(field.name, e.target.value)}
          >
            <option value="">— выберите —</option>
            {field.options?.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
          {errorMessage}
        </div>
      );
    case "checkbox": {
      const arr = Array.isArray(value) ? value : [];
      return (
        <fieldset
          className={disabled ? "opacity-60" : ""}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
        >
          <legend className="mb-1 text-sm font-medium text-slate-700">
            {field.label}
          </legend>
          <div className="flex flex-wrap gap-3">
            {field.options?.map((o, index) => {
              const optionId = `${fieldId}-${index}`;
              return (
                <label
                  key={o}
                  htmlFor={optionId}
                  className="flex items-center gap-1 text-sm"
                >
                  <input
                    id={optionId}
                    name={field.name}
                    type="checkbox"
                    disabled={disabled}
                    checked={arr.includes(o)}
                    onChange={(e) => {
                      if (e.target.checked) onChange(field.name, [...arr, o]);
                      else
                        onChange(
                          field.name,
                          arr.filter((x) => x !== o),
                        );
                    }}
                  />
                  {o}
                </label>
              );
            })}
          </div>
          {errorMessage}
        </fieldset>
      );
    }
    case "radio":
      return (
        <fieldset
          className={disabled ? "opacity-60" : ""}
          aria-invalid={Boolean(error)}
          aria-describedby={errorId}
        >
          <legend className="mb-1 text-sm font-medium text-slate-700">
            {field.label}
          </legend>
          <div className="flex flex-wrap gap-3">
            {field.options?.map((o, index) => {
              const optionId = `${fieldId}-${index}`;
              return (
                <label
                  key={o}
                  htmlFor={optionId}
                  className="flex items-center gap-1 text-sm"
                >
                  <input
                    id={optionId}
                    type="radio"
                    name={field.name}
                    disabled={disabled}
                    checked={value === o}
                    onChange={() => onChange(field.name, o)}
                  />
                  {o}
                </label>
              );
            })}
          </div>
          {errorMessage}
        </fieldset>
      );
    default:
      return null;
  }
}
