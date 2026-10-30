import type { Metadata } from "next";
import Link from "next/link";
import FormField from "../_components/FormField";

export const metadata: Metadata = {
  title: "Iniciar sesión · OpenDayCare",
};

function SunIcon() {
  return (
    <svg
      width="26"
      height="26"
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

export default function LoginPage() {
  return (
    <div className="grid min-h-screen grid-cols-[1.05fr_1fr] bg-auth-bg">
      <div className="relative flex flex-col justify-between overflow-hidden bg-[linear-gradient(155deg,#f6a98e_0%,#f2937a_45%,#ec7e62_100%)] px-[60px] py-[56px] text-white">
        <span
          aria-hidden="true"
          className="absolute -top-[140px] -right-[120px] h-[420px] w-[420px] rounded-full bg-white/12"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-[110px] -left-[80px] h-[300px] w-[300px] rounded-full bg-white/10"
        />

        <div className="relative flex items-center gap-[13px]">
          <span className="flex h-[46px] w-[46px] items-center justify-center rounded-[14px] bg-white/22">
            <SunIcon />
          </span>
          <span className="font-display text-[21px] font-semibold tracking-[.5px]">
            OpenDayCare
          </span>
        </div>

        <div className="relative">
          <h1 className="mb-[18px] font-display text-[42px] font-semibold leading-[1.12]">
            El día de cada niño,
            <br />
            compartido con su familia.
          </h1>
          <p className="max-w-[430px] text-[17px] leading-[1.6] text-white/92">
            Publicá momentos, gestioná las salas y mantené a las familias cerca,
            desde un solo lugar.
          </p>
        </div>

        <div className="relative text-[14px] text-white/90">
          🌿 Guardería Sala Soles
        </div>
      </div>

      <div className="flex items-center justify-center p-10">
        <div className="w-full max-w-[392px]">
          <h2 className="mb-1.5 font-display text-[30px] font-semibold text-ink">
            Iniciar sesión
          </h2>
          <p className="mb-7 text-[15px] text-muted-strong">
            Ingresá para ver el día de hoy.
          </p>

          <FormField
            label="EMAIL"
            type="email"
            placeholder="caro@opendaycare.com"
            inputClassName="mb-[18px] border-auth-input-border text-[15px]"
          />
          <FormField
            label="CONTRASEÑA"
            type="password"
            placeholder="••••••••"
            inputClassName="mb-[10px] border-auth-input-border text-[15px]"
          />
          <div className="mb-5 text-right">
            <span
              aria-disabled="true"
              className="text-[13.5px] font-bold text-accent-strong"
            >
              ¿Olvidaste tu contraseña?
            </span>
          </div>

          <Link
            href="/"
            className="block w-full rounded-[15px] bg-linear-to-b from-cta-from to-cta-to p-[15px] text-center text-base font-extrabold text-white shadow-[0_10px_22px_-8px_rgb(238_129_100/0.7)]"
          >
            Iniciar sesión
          </Link>

          <p className="mt-6 text-center text-[14.5px] text-muted-strong">
            ¿Te invitó la guardería?{" "}
            <Link
              href="/activate-account"
              className="font-extrabold text-accent-strong"
            >
              Activá tu cuenta
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
