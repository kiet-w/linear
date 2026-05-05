import type { HTMLAttributes } from "react";

type IconProps = HTMLAttributes<HTMLSpanElement> & {
  name: string;
  filled?: boolean;
};

export function Icon({
  name,
  filled = false,
  className = "",
  style,
  ...props
}: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${className}`.trim()}
      style={{
        fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0",
        ...style,
      }}
      {...props}
    >
      {name}
    </span>
  );
}
