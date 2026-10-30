import Link from "next/link";
import type { Child } from "../_data/children";
import Avatar from "./Avatar";

type ChildCardProps = {
  child: Child;
};

function parentsLabel(count: number): string {
  if (count === 0) return "sin padres vinculados";
  if (count === 1) return "1 padre vinculado";
  return `${count} padres vinculados`;
}

function ChevronIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#CBB89F"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="flex-none"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

const badgeClassName =
  "flex-none rounded-full px-[9px] py-[5px] text-[11px] font-extrabold";

export default function ChildCard({ child }: ChildCardProps) {
  return (
    <Link
      href={`/kids/${child.id}`}
      className="flex min-w-0 items-center gap-3.5 rounded-[18px] border border-line bg-surface p-4 shadow-[0_4px_14px_-12px_rgb(120_90_60/0.5)] transition hover:border-card-hover-border hover:-translate-y-0.5"
    >
      <Avatar
        initial={child.initial}
        color={child.avatarColor}
        variant="soft"
        size="md"
      />
      <div className="min-w-0 flex-1">
        <div className="font-display text-[16px] font-semibold text-ink">
          {child.name}
        </div>
        <div className="text-[13px] text-muted">
          {child.ageLabel} · {parentsLabel(child.parents.length)}
        </div>
      </div>
      {child.allergy ? (
        <span
          className={`${badgeClassName} bg-badge-allergy-bg text-badge-allergy-fg`}
        >
          {child.allergy.badge.toUpperCase()}
        </span>
      ) : child.parents.length === 0 ? (
        <span
          className={`${badgeClassName} bg-badge-link-bg text-badge-link-fg`}
        >
          VINCULAR
        </span>
      ) : (
        <ChevronIcon />
      )}
    </Link>
  );
}
