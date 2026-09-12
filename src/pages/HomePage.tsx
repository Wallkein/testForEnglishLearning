import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logoutThunk } from "../store/authSlice";
import Page from "../components/Page";
import Body from "../components/Body";
import { Link } from "react-router-dom";
import { getSavedProfileDisplayName } from "../services/api";

export default function HomePage() {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();

  return (
    <Page
      headerUser={getSavedProfileDisplayName(user)}
      onLogout={() => dispatch(logoutThunk())}
    >
      <Body title="Главная">
        <div className="grid gap-6 md:grid-cols-3">
          {!user && (
            <Link
              to="/cards"
              className="group cursor-pointer rounded-xl bg-white p-6 hover:shadow-[0px_0px_15px_0px_#2643541A]"
            >
              <h2 className="font-bold">Авторизация</h2>
              <p className="mt-2 text-sm text-slate-600">
                Разделы "Карточки" и "Профиль" доступны только после входа.
                Логин/пароль: admin/admin.
              </p>
              <div className="mt-4 inline-block text-[#73C3F3] group-hover:underline">
                Войти →
              </div>
            </Link>
          )}
          <Link
            to="/cards"
            className="group cursor-pointer rounded-xl bg-white p-6 hover:shadow-[0px_0px_15px_0px_#2643541A]"
          >
            <h2 className="font-bold">Карточки</h2>
            <p className="mt-2 text-sm text-slate-600">
              Набор карточек для изучения слов. Лицевая сторона — слово и
              пример, оборот — перевод. Переворот с CSS-анимацией.
            </p>
            <div className="mt-4 inline-block text-[#73C3F3] group-hover:underline">
              Перейти к карточкам →
            </div>
          </Link>
          <Link
            to="/profile"
            className="group cursor-pointer rounded-xl bg-white p-6 hover:shadow-[0px_0px_15px_0px_#2643541A]"
          >
            <h2 className="font-bold">Профиль</h2>
            <p className="mt-2 text-sm text-slate-600">
              Форма с данными пользователя
            </p>
            <div className="mt-14 inline-block text-[#73C3F3] group-hover:underline">
              Открыть профиль →
            </div>
          </Link>
        </div>
      </Body>
    </Page>
  );
}
