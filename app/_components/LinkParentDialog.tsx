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

function InfoIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4M12 8h.01" />
    </svg>
  );
}

function PaperPlaneIcon() {
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
      <path d="m22 2-7 20-4-9-9-4z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

export default function LinkParentDialog({ childName }: LinkParentDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const childFirstName = childName.split(" ")[0];

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

          <div className="overscroll-contain overflow-y-auto px-[26px] py-[22px]">
            <div className="mb-5 flex gap-[11px] rounded-[14px] bg-invite-info-bg px-4 py-[13px]">
              <span className="mt-px flex-none text-invite-info-icon">
                <InfoIcon />
              </span>
              <span className="text-[13.5px] leading-[1.45] text-invite-info-text">
                Le enviaremos un correo con un código para que active su
                cuenta. Solo verá el feed de {childFirstName}.
              </span>
            </div>

            <label className="block">
              <span className="mb-2 block text-[12px] font-extrabold tracking-[.7px] text-muted-strong">
                NOMBRE DEL PADRE/MADRE
              </span>
              <input
                placeholder="Ej. Diego Fernández"
                className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-auth-input-border bg-white px-4 py-[13px] text-[15px] text-ink"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[12px] font-extrabold tracking-[.7px] text-muted-strong">
                EMAIL
              </span>
              <input
                type="email"
                placeholder="correo@ejemplo.com"
                className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-auth-input-border bg-white px-4 py-[13px] text-[15px] text-ink"
              />
            </label>

            <fieldset className="mb-5">
              <legend className="mb-[10px] text-[12px] font-extrabold tracking-[.7px] text-muted-strong">
                PARENTESCO
              </legend>
              <div className="flex gap-[9px]">
                {relationOptions.map((option) => (
                  <label key={option} className="flex-1 cursor-pointer">
                    <input
                      type="radio"
                      name="relation"
                      value={option}
                      defaultChecked={option === "Mamá"}
                      className="peer sr-only"
                    />
                    <span className="flex w-full items-center justify-center rounded-full border-[1.5px] border-line bg-surface px-[11px] py-[11px] text-[14px] font-extrabold text-nav peer-checked:border-invite-relation-active-border peer-checked:bg-invite-relation-active-bg peer-checked:text-invite-relation-active-fg peer-focus-visible:ring-2 peer-focus-visible:ring-invite-relation-active-border peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-auth-bg">
                      {option}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mb-5 rounded-[16px] border-[1.5px] border-dashed border-invite-code-border bg-consent-bg px-[18px] py-[18px] text-center">
              <div className="mb-2 text-[12px] font-extrabold tracking-[.7px] text-invite-code-muted">
                CÓDIGO DE INVITACIÓN
              </div>
              <div className="font-display text-[34px] font-semibold tracking-[7px] text-consent-fg">
                {invitationCode}
              </div>
              <div className="mt-[6px] text-[13px] text-invite-code-muted">
                Vence en 7 días
              </div>
            </div>

            <button
              type="button"
              onClick={closeDialog}
              className="flex w-full cursor-pointer items-center justify-center gap-[9px] rounded-[14px] bg-linear-to-b from-cta-from to-cta-to p-[14px] text-[15.5px] font-extrabold text-white shadow-[0_10px_22px_-8px_rgb(238_129_100/0.7)]"
            >
              <PaperPlaneIcon />
              Enviar invitación
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
}
