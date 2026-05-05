export function FadeDivider({
  variant = "darkToLight",
}: {
  variant?: "darkToLight" | "lightToDark";
}) {
  const gradient =
    variant === "darkToLight"
      ? "linear-gradient(to bottom, #0b0b0b, #ffffff)"
      : "linear-gradient(to bottom, #ffffff, #0b0b0b)";

  return <div className="h-32 w-full" style={{ background: gradient }} />;
}