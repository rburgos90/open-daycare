"use client";

import { useRef } from "react";

const invitationCode = "7K4P9";
const relationOptions = ["Mamá", "Papá", "Tutor/a"] as const;

type LinkParentDialogProps = {
  childName: string; // "Mateo Fernández"
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

function CloseIcon() {
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
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export default function LinkParentDialog({ childName }: LinkParentDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function openDialog() {
    dialogRef.current?.showModal();
  }

  function closeDialog() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openDialog}
        className="flex cursor-pointer items-center gap-3 pt-2"
      >
        <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full border-[1.5px] border-dashed border-[#d8cbba] text-photo-fg">
          <PlusIcon />
        </span>
        <span className="text-[14.5px] font-extrabold text-accent-strong">
          Vincular otro padre
        </span>
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="link-parent-title"
        className="open:flex fixed inset-0 m-0 h-dvh w-screen max-h-none max-w-none items-center justify-center overflow-hidden bg-transparent p-6 [&::backdrop]:bg-[rgb(63_54_46/0.4)]"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeDialog();
          }
        }}
        onClose={() => triggerRef.current?.focus()}
      >
        <div className="flex max-h-full w-full max-w-[480px] flex-col overflow-hidden rounded-[24px] border border-line bg-auth-bg shadow-[0_20px_50px_-24px_rgb(63_54_46/0.35)]">
          <div className="flex items-center justify-between border-b border-line px-[26px] py-5">
            <div>
              <h2
                id="link-parent-title"
                className="font-display text-[18px] font-semibold text-ink"
              >
                Vincular padre
              </h2>
              <div className="text-[13px] text-muted">a {childName}</div>
            </div>
            <button
              type="button"
              onClick={closeDialog}
              aria-label="Cerrar"
              className="flex h-[34px] w-[34px] flex-none cursor-pointer items-center justify-center rounded-[10px] bg-line-soft text-muted-strong"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="overscroll-contain overflow-y-auto px-[26px] py-[22px]" />
        </div>
      </dialog>
    </>
  );
}
