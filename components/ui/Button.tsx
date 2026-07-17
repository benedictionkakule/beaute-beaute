type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};

export default function Button({
  children,
  variant = "primary",
  type = "button",
  onClick,
}: ButtonProps) {
  const baseStyles =
    "rounded-full px-6 py-3 font-medium transition-all duration-300";

  const variants = {
    primary:
      "bg-[#D98CA8] text-white hover:bg-[#C97A97] shadow-sm hover:shadow-md",
    secondary:
      "bg-white text-[#D98CA8] border border-[#D98CA8] hover:bg-[#FFF8F5]",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]}`}
    >
      {children}
    </button>
  );
}