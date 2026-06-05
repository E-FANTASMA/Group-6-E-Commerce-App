type ValeLogoProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizes = {
  sm: "text-2xl",
  md: "text-4xl",
  lg: "text-5xl",
};

export default function ValeLogo({ size = "md", className = "" }: ValeLogoProps) {
  return (
    <h1
      className={`font-['Plaster'] leading-none ${sizes[size]} ${className}`}
      aria-label="Vale"
    >
      <span className="text-[#4E8A66]">V</span>
      <span className="text-[#DCCFC0]">a</span>
      <span className="text-[#4E8A66]">l</span>
      <span className="text-[#DCCFC0]">e</span>
    </h1>
  );
}
