import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { logoutThunk } from "../store/authSlice";
import Page from "../components/Page";
import Body from "../components/Body";
import CardList from "../components/CardList";
import { getSavedProfileDisplayName, mockFetchWords } from "../services/api";
import type { WordCard } from "../data/words";

export default function CardsPage() {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();
  const [cards, setCards] = useState<WordCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    mockFetchWords()
      .then((w) => {
        setCards(w);
        setError(null);
      })
      .catch(() => {
        setError("Не удалось загрузить карточки. Попробуйте позже.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <Page
      headerUser={getSavedProfileDisplayName(user)}
      onLogout={() => dispatch(logoutThunk())}
    >
      <Body
        title="Карточки для изучения слов"
        subtitle="Нажмите LEARN MORE, чтобы перевернуть карточку и увидеть перевод."
      >
        {loading ? (
          <p className="text-slate-500">Загрузка карточек...</p>
        ) : error ? (
          <p className="rounded bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        ) : (
          <CardList cards={cards} />
        )}
      </Body>
    </Page>
  );
}
