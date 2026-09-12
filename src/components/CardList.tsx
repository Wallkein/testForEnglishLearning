import type { WordCard } from "../data/words";
import Card from "./Card";

interface CardListProps {
  cards: WordCard[];
}

export default function CardList({ cards }: CardListProps) {
  if (cards.length === 0) {
    return <p className="text-slate-500">Нет карточек для отображения.</p>;
  }
  return (
    <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {cards.map((c) => (
        <li key={c.id}>
          <Card card={c} />
        </li>
      ))}
    </ul>
  );
}
