import profileLogo from "../assets/optimized/LOGO-KVI.webp";

export default function Logo({
  variant = "light",
  size = "md",
  showText = false,
}) {
  const sizes = {
    sm: { img: "h-9" },
    md: { img: "h-12" },
    lg: { img: "h-16" },
    xl: { img: "h-20" },
  };
  const s = sizes[size] ?? sizes.md;

  return (
    <div className="flex items-center">
      <img
        src={profileLogo}
        alt="Konsil Veteriner Indonesia"
        className={`${s.img} w-auto object-contain ${variant === "dark" ? "drop-shadow-[0_2px_8px_rgba(0,0,0,0.25)]" : ""}`}
      />
    </div>
  );
}
