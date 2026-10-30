import type { LinkedParent, ParentStatus } from "../_data/children";
import Avatar from "./Avatar";

type ParentListProps = {
  parents: LinkedParent[];
};

const parentStatusStyles: Record<
  ParentStatus,
  { label: string; badgeLabel: string; badgeClassName: string }
> = {
  active: {
    label: "activa",
    badgeLabel: "ACTIVA",
    badgeClassName: "bg-badge-active-bg text-badge-active-fg",
  },
  pending: {
    label: "invitación enviada",
    badgeLabel: "PENDIENTE",
    badgeClassName: "bg-badge-pending-bg text-badge-pending-fg",
  },
};

function PlusIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

export default function ParentList({ parents }: ParentListProps) {
  return (
    <div className="flex flex-col gap-3.5">
      {parents.map((parent) => {
        const status = parentStatusStyles[parent.status];

        return (
          <div key={parent.name} className="flex items-center gap-3">
            <Avatar
              initial={parent.initial}
              color={parent.avatarColor}
              variant="solid"
              size="sm"
            />
            <div className="min-w-0 flex-1">
              <div className="text-[14.5px] font-extrabold text-ink">
                {parent.name}
              </div>
              <div className="text-[12.5px] text-muted">
                {parent.relation} · {status.label}
              </div>
            </div>
            <span
              className={`flex-none rounded-full px-[9px] py-1 text-[10.5px] font-extrabold ${status.badgeClassName}`}
            >
              {status.badgeLabel}
            </span>
          </div>
        );
      })}
      <span aria-disabled="true" className="flex items-center gap-3 pt-2">
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border-[1.5px] border-dashed border-[#d8cbba] text-photo-fg">
          <PlusIcon />
        </span>
        <span className="text-[14.5px] font-extrabold text-accent-strong">
          Vincular otro padre
        </span>
      </span>
    </div>
  );
}
