import Link from "next/link";
import { currentUser, room } from "../_data/feed";

function LogoIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 9.5 12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" />
    </svg>
  );
}

function ChildrenIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="7" r="3" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 20a5 5 0 0 1 5.5-4.9" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" />
    </svg>
  );
}

const navItemClassName =
  "flex items-center gap-3 rounded-xl px-3 py-[11px] text-[14.5px]";
const activeItemClassName = "bg-accent-soft text-accent font-extrabold";
const inactiveItemClassName = "text-nav font-semibold";

export default function Sidebar() {
  return (
    <aside className="sticky top-0 flex h-screen w-[248px] flex-none flex-col border-r border-line bg-surface px-4 py-6">
      <span
        aria-disabled="true"
        className="flex items-center gap-[11px] px-2 pt-1 pb-[22px]"
      >
        <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-[12px] bg-[linear-gradient(155deg,var(--color-logo-from),var(--color-logo-to))]">
          <LogoIcon />
        </span>
        <span>
          <span className="block font-display text-[17px] font-semibold leading-none text-ink">
            OpenDayCare
          </span>
          <span className="mt-0.5 block text-[11.5px] text-muted">
            {room.name}
          </span>
        </span>
      </span>

      <span
        aria-disabled="true"
        className="mb-[18px] flex w-full items-center justify-center gap-2 rounded-[14px] bg-linear-to-b from-cta-from to-cta-to p-3 text-[14.5px] font-extrabold text-white shadow-cta"
      >
        <PlusIcon />
        Nueva publicación
      </span>

      <nav className="flex flex-1 flex-col gap-1">
        <Link
          href="/"
          aria-current="page"
          className={`${navItemClassName} ${activeItemClassName}`}
        >
          <HomeIcon />
          Feed
        </Link>
        <span
          aria-disabled="true"
          className={`${navItemClassName} ${inactiveItemClassName}`}
        >
          <ChildrenIcon />
          Niños
        </span>
        <span
          aria-disabled="true"
          className={`${navItemClassName} ${inactiveItemClassName}`}
        >
          <BellIcon />
          Avisos
        </span>
        <span
          aria-disabled="true"
          className={`${navItemClassName} ${inactiveItemClassName}`}
        >
          <UserIcon />
          Mi cuenta
        </span>
      </nav>

      <div className="mt-[10px] border-t border-line pt-[14px]">
        <div className="flex items-center gap-[11px] px-2 py-1.5">
          <span className="flex h-[38px] w-[38px] flex-none items-center justify-center rounded-full bg-avatar font-display text-base font-semibold text-white">
            {currentUser.initial}
          </span>
          <div className="min-w-0 flex-1">
            <div className="text-[14px] font-extrabold text-ink">
              {currentUser.name}
            </div>
            <div className="text-[12px] text-muted">{currentUser.role}</div>
          </div>
          <span
            aria-disabled="true"
            title="Cerrar sesión"
            className="flex h-8 w-8 flex-none items-center justify-center rounded-[10px] bg-canvas text-muted-strong"
          >
            <LogoutIcon />
          </span>
        </div>
      </div>
    </aside>
  );
}
