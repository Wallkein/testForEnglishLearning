import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

interface HeaderProps {
  user: string | null;
  onLogout: () => void;
}

export default function Header({ user, onLogout }: HeaderProps) {
  const navigate = useNavigate();
  const authUser = useAppSelector((s) => s.auth.user);
  return (
    <header className="bg-white shadow-[0px_0px_15px_0px_#2643541A]">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center justify-between gap-3 px-3 py-3 sm:px-4">
        <Link
          to="/"
          className="shrink-0 text-lg font-bold text-[#73C3F3] sm:text-xl"
        >
          EnglishCards
        </Link>
        <nav
          aria-label="Основная навигация"
          className="flex min-w-0 flex-1 flex-wrap items-center justify-end gap-x-3 gap-y-2 text-xs sm:gap-4 sm:text-sm"
        >
          <Link className="shrink-0 hover:text-[#73C3F3]" to="/">
            Главная
          </Link>
          <Link className="shrink-0 hover:text-[#73C3F3]" to="/cards">
            Карточки
          </Link>
          <Link className="shrink-0 hover:text-[#73C3F3]" to="/profile">
            Профиль
          </Link>
          {user && authUser ? (
            <span className="flex min-w-0 items-center gap-2">
              <span className="max-w-32 truncate rounded-full bg-[#73C3F3] px-2 py-1 font-medium text-white sm:max-w-48 sm:px-3">
                {user}
              </span>
              <button
                onClick={() => {
                  onLogout();
                  navigate("/");
                }}
                className="shrink-0 rounded bg-slate-200 px-2 py-1 hover:bg-slate-300 sm:px-3"
              >
                Выйти
              </button>
            </span>
          ) : (
            <Link
              to="/login"
              className="rounded bg-[#73C3F3] px-3 py-1 text-white hover:opacity-80"
            >
              Войти
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
