import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { loginThunk, clearError } from "../store/authSlice";
import Page from "../components/Page";
import Body from "../components/Body";
import { getSavedProfileDisplayName } from "../services/api";

export default function LoginPage() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { user, status, error } = useAppSelector((s) => s.auth);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  useEffect(() => {
    if (user) navigate("/cards");
  }, [user, navigate]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginThunk({ login, password }));
  };

  return (
    <Page headerUser={getSavedProfileDisplayName(user)} onLogout={() => {}}>
      <Body
        title="Вход"
        subtitle="Введите логин и пароль. Подсказка: admin / admin"
      >
        <div className="mx-auto max-w-sm rounded-xl bg-white p-6 shadow-[0px_0px_15px_0px_#2643541A]">
          <form onSubmit={submit} className="flex flex-col gap-4" noValidate>
            <div>
              <label htmlFor="login" className="mb-1 block text-sm font-medium">
                Логин
              </label>
              <input
                id="login"
                name="username"
                type="text"
                autoComplete="username"
                className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                placeholder="admin"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="mb-1 block text-sm font-medium"
              >
                Пароль
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                className="w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin"
              />
            </div>
            {error && (
              <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-600">
                Вход невозможен – неправильные логин или пароль
              </p>
            )}
            <button
              type="submit"
              disabled={status === "loading"}
              className="rounded bg-[#73C3F3] px-4 py-2 hover:opacity-80 text-white disabled:opacity-50"
            >
              {status === "loading" ? "Входим..." : "Войти"}
            </button>
          </form>
        </div>
      </Body>
    </Page>
  );
}
