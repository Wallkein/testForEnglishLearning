interface FooterProps {
  contacts: string;
}

export default function Footer({ contacts }: FooterProps) {
  return (
    <footer className="bg-[#3F4A50] text-slate-200">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-6 text-sm sm:flex-row sm:items-center sm:justify-between">
        <span>EnglishCards © 2026 — учим слова каждый день</span>
        <span className="text-slate-300">{contacts}</span>
      </div>
    </footer>
  );
}
