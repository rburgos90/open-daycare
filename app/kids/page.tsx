import type { Metadata } from "next";
import AddChildDialog from "../_components/AddChildDialog";
import ChildCard from "../_components/ChildCard";
import Sidebar from "../_components/Sidebar";
import { children, roomLabel } from "../_data/children";

export const metadata: Metadata = {
  title: "Niños · OpenDayCare",
};

function SearchIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default function KidsPage() {
  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar active="kids" />
      <main className="h-screen min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[880px] px-10 pt-[34px] pb-20">
          <header className="mb-[22px] flex items-end justify-between gap-4">
            <div>
              <div className="mb-1 text-[12.5px] font-extrabold tracking-[.8px] text-accent">
                GESTIÓN
              </div>
              <h1 className="font-display text-[30px] font-semibold text-ink">
                Niños
              </h1>
            </div>
            <AddChildDialog />
          </header>

          <div className="mb-[22px] flex items-center gap-[11px] rounded-[14px] border border-line bg-surface px-4 py-3">
            <span className="text-photo-fg">
              <SearchIcon />
            </span>
            <input
              placeholder="Buscar niño…"
              className="flex-1 border-none bg-transparent text-[15px] text-ink"
            />
          </div>

          <div className="mb-3.5 flex items-center gap-3">
            <span className="text-[12.5px] font-extrabold tracking-[.8px] text-ink">
              {roomLabel.toUpperCase()}
            </span>
            <span className="text-[13px] text-muted">
              {children.length} niños
            </span>
            <span className="h-px flex-1 bg-line-strong" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            {children.map((child) => (
              <ChildCard key={child.id} child={child} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
