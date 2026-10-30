import type { Metadata } from "next";
import Link from "next/link";
import FormField from "../_components/FormField";
import { invitation } from "../_data/invitation";

export const metadata: Metadata = {
  title: "Activar cuenta · OpenDayCare",
};

function SunIcon() {
  return (
    <svg
      width="30"
      height="30"
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

function CheckIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default function ActivateAccountPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-auth-bg p-10">
      <div className="w-full max-w-[440px]">
        <span className="mb-[22px] flex h-[58px] w-[58px] items-center justify-center rounded-[18px] bg-[linear-gradient(155deg,var(--color-logo-from),var(--color-logo-to))] shadow-[0_12px_26px_-10px_rgb(238_129_100/0.65)]">
          <SunIcon />
        </span>
        <h1 className="mb-2 font-display text-[32px] font-semibold leading-[1.15] text-ink">
          Bienvenida a OpenDayCare
        </h1>
        <p className="mb-[26px] text-[15.5px] leading-[1.55] text-muted-strong">
          Te invitaron a seguir el día de tu hijo. Creá tu contraseña para
          activar la cuenta.
        </p>

        <div className="mb-[22px] flex items-center gap-[14px] rounded-[16px] border-[1.5px] border-[#eadfd0] bg-white px-4 py-[14px]">
          <span className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-child-bg font-display text-[19px] font-semibold text-child-fg">
            {invitation.childInitial}
          </span>
          <div>
            <div className="text-[13px] text-muted-strong">
              Te invitaron a seguir a
            </div>
            <div className="font-display text-[17px] font-semibold text-ink">
              {invitation.childLabel}
            </div>
          </div>
        </div>

        <FormField
          label="CÓDIGO DE INVITACIÓN"
          defaultValue={invitation.code}
          inputClassName="mb-[18px] border-auth-input-border font-display text-[18px] font-bold tracking-[3px]"
        />
        <FormField
          label="EMAIL"
          type="email"
          defaultValue={invitation.email}
          inputClassName="mb-[18px] border-auth-input-border text-[15px]"
        />
        <FormField
          label="CREAR CONTRASEÑA"
          type="password"
          defaultValue={invitation.password}
          inputClassName="mb-[18px] border-[#f2a78e] text-[15px]"
        />

        <span
          aria-disabled="true"
          className="mb-6 flex items-start gap-3 rounded-[14px] bg-consent-bg px-4 py-[14px]"
        >
          <span className="mt-px flex h-6 w-6 flex-none items-center justify-center rounded-[8px] bg-consent-check">
            <CheckIcon />
          </span>
          <span className="text-[14px] leading-[1.45] text-consent-fg">
            {invitation.consentText}
          </span>
        </span>

        <span
          aria-disabled="true"
          className="block w-full rounded-[15px] bg-linear-to-b from-cta-from to-cta-to p-[15px] text-center text-base font-extrabold text-white shadow-[0_10px_22px_-8px_rgb(238_129_100/0.7)]"
        >
          Activar mi cuenta
        </span>
        <p className="mt-[22px] text-center text-[14.5px] text-muted-strong">
          ¿Ya tenés cuenta?{" "}
          <Link href="/login" className="font-extrabold text-accent-strong">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  );
}
