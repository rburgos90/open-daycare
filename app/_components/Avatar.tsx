import type { AvatarColor } from "../_data/children";

type AvatarSize = "sm" | "md" | "lg";
type AvatarVariant = "soft" | "solid";

type AvatarProps = {
  initial: string;
  color: AvatarColor;
  variant: AvatarVariant;
  size: AvatarSize;
};

const avatarPalette: Record<AvatarColor, { bg: string; softFg: string }> = {
  blue: { bg: "bg-[#a9d9e8]", softFg: "text-[#1f7a93]" },
  pink: { bg: "bg-[#f4b8cc]", softFg: "text-[#c44a7a]" },
  green: { bg: "bg-[#b9dec4]", softFg: "text-[#3e8b62]" },
  yellow: { bg: "bg-[#f4dc8e]", softFg: "text-[#9a7b1e]" },
  purple: { bg: "bg-[#c9b6e8]", softFg: "text-[#7b5fc0]" },
  // Sky is solid-only in the data: pastel background with white text.
  sky: { bg: "bg-[#a9c7e8]", softFg: "text-white" },
};

const sizeClassName: Record<AvatarSize, string> = {
  sm: "h-10 w-10 text-[16px]",
  md: "h-12 w-12 text-[19px]",
  lg: "h-[84px] w-[84px] text-[34px]",
};

export default function Avatar({
  initial,
  color,
  variant,
  size,
}: AvatarProps) {
  const palette = avatarPalette[color];

  return (
    <span
      className={`flex flex-none items-center justify-center rounded-full font-display font-semibold ${palette.bg} ${
        variant === "solid" ? "text-white" : palette.softFg
      } ${sizeClassName[size]}`}
    >
      {initial}
    </span>
  );
}
