import { useState } from "react";
import type { WordCard } from "../data/words";

interface CardProps {
  card: WordCard;
}

export default function Card({ card }: CardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <article className="perspective-1000 h-72">
      <button
        type="button"
        aria-pressed={flipped}
        aria-label={
          flipped
            ? `Показать английское слово ${card.word}`
            : `Показать перевод слова ${card.word}`
        }
        onClick={() => setFlipped((current) => !current)}
        className="group h-full w-full cursor-pointer text-start focus:outline-none"
      >
        <div
          className={`flip-inner preserve-3d relative h-full w-full ${flipped ? "rotate-y-180" : ""}`}
        >
          {/* Лицевая сторона */}
          <div
            aria-hidden={flipped}
            className="backface-hidden absolute inset-0 flex flex-col items-start rounded-xl bg-white p-6 hover:shadow-[0px_0px_15px_0px_#2643541A]"
          >
            <p className="text-sm text-slate-500">{card.title}</p>
            <h3 className="mt-2 text-3xl font-semibold">
              {card.transcription}
            </h3>
            <p className="text-slate-500">{card.partOfSpeech}</p>
            <p className="mt-3 text-slate-700">{card.semantics}</p>
            <p className="text-slate-700">{card.example}</p>
            <div className="mt-auto pt-4">
              <div className="text-sm font-bold tracking-wide text-slate-900 group-hover:text-[#73C3F3]">
                LEARN MORE
              </div>
            </div>
          </div>
          {/* Оборот: перевод */}
          <div
            aria-hidden={!flipped}
            className="backface-hidden absolute inset-0 flex rotate-y-180 flex-col items-start rounded-xl bg-[#73C3F3] p-6 text-white hover:shadow-[0px_0px_15px_0px_#2643541A]"
          >
            <p className="text-sm text-white">{card.title}</p>
            <h3 className="mt-2 text-3xl font-semibold">{card.word}</h3>
            <p className="mt-3 text-lg">Перевод:</p>
            <p className="text-xl font-medium">{card.translation}</p>
            <div className="mt-auto pt-4">
              <div className="text-sm font-bold tracking-wide text-white group-hover:text-indigo-100">
                НАЗАД К СЛОВУ
              </div>
            </div>
          </div>
        </div>
      </button>
    </article>
  );
}
