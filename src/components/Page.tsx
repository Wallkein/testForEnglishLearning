import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { CONTACTS } from "../store/constants";

interface PageProps {
  headerUser: string | null;
  onLogout: () => void;
  children: ReactNode;
}

// Page — страница целиком: Header + контент + Footer
export default function Page({ headerUser, onLogout, children }: PageProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header user={headerUser} onLogout={onLogout} />
      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8">
        {children}
      </main>
      <Footer contacts={CONTACTS} />
    </div>
  );
}
