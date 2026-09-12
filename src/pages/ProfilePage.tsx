import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logoutThunk } from "../store/authSlice";
import Page from "../components/Page";
import Body from "../components/Body";
import EditView from "../components/EditView";
import { PROFILE_FIELDS } from "../data/profileFields";
import {
  buildProfileDisplayName,
  getSavedProfile,
  mockFetchProfile,
  mockSaveProfile,
} from "../services/api";
import type { ProfileValue, ProfileValues } from "../data/profileFields";

export default function ProfilePage() {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const [values, setValues] = useState<ProfileValues>(() => getSavedProfile());
  const [savedValues, setSavedValues] = useState<ProfileValues>(() =>
    getSavedProfile(),
  );
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    mockFetchProfile().then((profile) => {
      if (!active) return;
      setValues(profile);
      setSavedValues(profile);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, []);

  const handleChange = (name: string, value: ProfileValue) => {
    setValues((prev) => {
      const next = { ...prev, [name]: value };
      // Связь полей: если поле "а" (tariff) = "Премиум", в поле "в" ставим 990
      if (name === "tariff" && value === "Премиум") {
        next["subscriptionPrice"] = 990;
      }
      if (name === "tariff" && value === "Бесплатный") {
        next["subscriptionPrice"] = 0;
      }
      return next;
    });
    setStatus(null);
    setSaveError(null);
  };

  // поле "б" (promo) скрыто при tariff === "Премиум"
  const isHidden = (name: string) =>
    name === "promo" && values["tariff"] === "Премиум";
  // поле "в" (subscriptionPrice) недоступно при tariff === "Премиум";
  // monthlyGoal недоступно при level === "Начинающий"
  const isDisabled = (name: string) => {
    if (name === "subscriptionPrice" && values["tariff"] === "Премиум")
      return true;
    if (name === "monthlyGoal" && values["level"] === "Начинающий") return true;
    return false;
  };

  const handleSubmit = async () => {
    setStatus(null);
    setSaveError(null);

    try {
      await mockSaveProfile(values);
      setSavedValues(values);
      setStatus("Профиль сохранён. Данные выведены в консоль.");
      console.log(values, "Сохраненные данные");
    } catch {
      setSaveError("Не удалось сохранить профиль. Попробуйте позже.");
    }
  };

  return (
    <Page
      headerUser={buildProfileDisplayName(savedValues, user)}
      onLogout={() => dispatch(logoutThunk())}
    >
      <Body
        title="Профиль"
        subtitle={`Данные вашего профиля, "Имя" и "Фамилия" обязательны к заполнению.`}
      >
        {loading ? (
          <p className="text-slate-500">Загрузка сохранённого профиля...</p>
        ) : (
          <EditView
            fields={PROFILE_FIELDS}
            values={values}
            onChange={handleChange}
            isDisabled={isDisabled}
            isHidden={isHidden}
            onSubmit={handleSubmit}
            status={status ?? saveError}
            hasError={Boolean(saveError)}
          />
        )}
      </Body>
    </Page>
  );
}
