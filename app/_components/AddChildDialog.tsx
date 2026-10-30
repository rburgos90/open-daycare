"use client";

import { useRef } from "react";
import { children } from "../_data/children";

const rooms = [...new Set(children.map((child) => child.room))];

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

function ChevronIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function AddChildDialog() {
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
        className="flex cursor-pointer items-center gap-2 rounded-[14px] bg-linear-to-b from-cta-from to-cta-to px-[18px] py-[11px] text-[14.5px] font-extrabold text-white shadow-[0_8px_18px_-8px_rgb(238_129_100/0.7)]"
      >
        <PlusIcon />
        Agregar niño
      </button>

      <dialog
        ref={dialogRef}
        aria-labelledby="add-child-title"
        className="open:flex fixed inset-0 m-0 h-dvh w-screen max-h-none max-w-none items-center justify-center overflow-hidden bg-transparent p-6 [&::backdrop]:bg-[rgb(63_54_46/0.4)]"
        onClick={(event) => {
          if (event.target === event.currentTarget) {
            closeDialog();
          }
        }}
        onClose={() => triggerRef.current?.focus()}
      >
        <div className="flex max-h-full w-full max-w-[520px] flex-col overflow-hidden rounded-[24px] border border-line bg-auth-bg shadow-[0_20px_50px_-24px_rgb(63_54_46/0.35)]">
          <div className="flex items-center justify-between border-b border-line px-[26px] py-5">
            <button
              type="button"
              onClick={closeDialog}
              className="cursor-pointer text-[15px] font-bold text-muted-strong"
            >
              Cancelar
            </button>
            <h2
              id="add-child-title"
              className="font-display text-[18px] font-semibold text-ink"
            >
              Agregar niño
            </h2>
            <button
              type="button"
              onClick={closeDialog}
              className="cursor-pointer text-[15px] font-extrabold text-accent"
            >
              Guardar
            </button>
          </div>

          <div className="overscroll-contain overflow-y-auto px-[26px] py-6">
            <label className="block">
              <span className="mb-2 block text-xs font-extrabold tracking-[.7px] text-muted-strong">
                NOMBRE COMPLETO
              </span>
              <input
                placeholder="Ej. Martina López"
                className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-auth-input-border bg-white px-4 py-[13px] text-[15px] text-ink"
              />
            </label>

            <div className="mb-[18px] flex gap-[14px]">
              <label className="block flex-1">
                <span className="mb-2 block text-xs font-extrabold tracking-[.7px] text-muted-strong">
                  FECHA DE NACIMIENTO
                </span>
                <input
                  placeholder="dd/mm/aaaa"
                  className="w-full rounded-[14px] border-[1.5px] border-auth-input-border bg-white px-4 py-[13px] text-[15px] text-ink"
                />
              </label>
              <label className="block flex-1">
                <span className="mb-2 block text-xs font-extrabold tracking-[.7px] text-muted-strong">
                  SALA
                </span>
                <span className="relative block">
                  <select
                    defaultValue={rooms[0]}
                    className="w-full appearance-none rounded-[14px] border-[1.5px] border-auth-input-border bg-white py-[13px] pl-4 pr-10 text-[15px] font-bold text-ink"
                  >
                    {rooms.map((room) => (
                      <option key={room} value={room}>
                        {room}
                      </option>
                    ))}
                  </select>
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-photo-fg"
                  >
                    <ChevronIcon />
                  </span>
                </span>
              </label>
            </div>

            <label className="block">
              <span className="mb-2 block text-xs font-extrabold tracking-[.7px] text-muted-strong">
                ALERGIAS (ETIQUETAS)
              </span>
              <input
                placeholder="Ej. Maní, Lactosa"
                className="mb-[18px] w-full rounded-[14px] border-[1.5px] border-auth-input-border bg-white px-4 py-[13px] text-[15px] text-ink"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-xs font-extrabold tracking-[.7px] text-muted-strong">
                NOTAS MÉDICAS
              </span>
              <textarea
                placeholder="Indicaciones, medicación, contactos…"
                className="min-h-[90px] w-full resize-y rounded-[14px] border-[1.5px] border-auth-input-border bg-white px-4 py-[13px] text-[15px] leading-[1.5] text-ink"
              />
            </label>
          </div>
        </div>
      </dialog>
    </>
  );
}
