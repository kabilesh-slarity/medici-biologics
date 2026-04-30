import type { CSSProperties } from "react";
import Image from "next/image";

interface LogoProps {
  style?: CSSProperties;
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ style, className, width = 120, height = 60 }: LogoProps) {
  return (
    <div
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        ...style,
      }}
    >
      <Image
        src="/logo.svg"
        alt="Medici Peptides"
        width={width}
        height={height}
        priority
        style={{
          width: "auto",
          height: `${height}px`,
        }}
      />
    </div>
  );
}
