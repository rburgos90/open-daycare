import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Avatar from "../../_components/Avatar";
import ParentList from "../../_components/ParentList";
import Sidebar from "../../_components/Sidebar";
import { children, roomLabel } from "../../_data/children";

export const instant = false;

export function generateStaticParams() {
  return children.map((child) => ({ id: String(child.id) }));
}

export async function generateMetadata({
  params,
}: PageProps<"/kids/[id]">): Promise<Metadata> {
  const { id } = await params;
  const child = children.find((c) => c.id === Number(id));

  return {
    title: child ? `${child.name} · OpenDayCare` : "Niños · OpenDayCare",
  };
}

function BackIcon() {
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
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z" />
      <path d="M12 9v4M12 17h.01" />
    </svg>
  );
}

function SunIcon() {
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
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  );
}

export default async function ChildProfilePage({
  params,
}: PageProps<"/kids/[id]">) {
  const { id } = await params;
  const child = children.find((c) => c.id === Number(id));
  if (!child) notFound();

  return (
    <div className="flex min-h-screen bg-canvas">
      <Sidebar active="kids" />
      <main className="h-screen min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto w-full max-w-[820px] px-10 pt-[34px] pb-20">
          <Link
            href="/kids"
            className="mb-5 flex items-center gap-[7px] text-[14px] font-bold text-muted-strong"
          >
            <BackIcon />
            Volver a Niños
          </Link>

          <div className="flex flex-wrap items-start gap-[26px]">
            <div className="flex min-w-[300px] flex-1 flex-col gap-[18px]">
              <div className="flex items-center gap-[18px]">
                <Avatar
                  initial={child.initial}
                  color={child.avatarColor}
                  variant="soft"
                  size="lg"
                />
                <div className="flex-1">
                  <h1 className="font-display text-[28px] font-semibold text-ink">
                    {child.name}
                  </h1>
                  <p className="mt-[3px] text-[15px] text-muted-strong">
                    {child.ageLabel} · {roomLabel}
                  </p>
                </div>
                <span
                  aria-disabled="true"
                  className="rounded-[12px] border-[1.5px] border-line bg-surface px-4 py-[9px] text-[14px] font-bold text-nav"
                >
                  Editar
                </span>
              </div>

              {child.allergy ? (
                <div className="flex gap-3.5 rounded-[16px] bg-allergy-box-bg px-[18px] py-4">
                  <span className="flex h-10 w-10 flex-none items-center justify-center rounded-[11px] bg-allergy-box-icon-bg text-white">
                    <WarningIcon />
                  </span>
                  <div>
                    <div className="mb-[2px] text-[15px] font-extrabold text-allergy-box-title">
                      Alergias y notas
                    </div>
                    <div className="text-[14.5px] leading-[1.5] text-allergy-box-text">
                      {child.allergy.note}
                    </div>
                  </div>
                </div>
              ) : null}

              <div className="overflow-hidden rounded-[16px] border border-line bg-surface">
                <div className="flex justify-between border-b border-line-soft px-[18px] py-[15px]">
                  <span className="text-[14.5px] text-muted-strong">
                    Fecha de nacimiento
                  </span>
                  <span className="text-[14.5px] font-extrabold text-ink">
                    {child.birthDate}
                  </span>
                </div>
                <div className="flex justify-between border-b border-line-soft px-[18px] py-[15px]">
                  <span className="text-[14.5px] text-muted-strong">Sala</span>
                  <span className="text-[14.5px] font-extrabold text-ink">
                    {child.room}
                  </span>
                </div>
                <div className="flex justify-between px-[18px] py-[15px]">
                  <span className="text-[14.5px] text-muted-strong">Ingreso</span>
                  <span className="text-[14.5px] font-extrabold text-ink">
                    {child.enrolled}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex w-[300px] flex-none flex-col gap-3.5">
              <span
                aria-disabled="true"
                className="flex w-full items-center justify-center gap-[9px] rounded-[14px] bg-ink p-[13px] text-[15px] font-extrabold text-white"
              >
                <SunIcon />
                Resumen del día
              </span>

              <div className="rounded-[16px] border border-line bg-surface px-[18px] py-4">
                <div className="mb-3.5 text-[12.5px] font-extrabold tracking-[.8px] text-caption">
                  PADRES VINCULADOS
                </div>
                <ParentList parents={child.parents} />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
