
import React from "react";
import { cn } from "@/lib/utils";

interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  cols?: number | { sm?: number; md?: number; lg?: number; xl?: number };
  gap?: number | string;
  children: React.ReactNode;
}

export function Grid({
  cols = 1,
  gap = 4,
  className,
  children,
  ...props
}: GridProps) {
  const getColsClass = () => {
    if (typeof cols === "number") {
      return `grid-cols-${cols}`;
    }
    
    const { sm, md, lg, xl } = cols;
    return cn(
      sm && `sm:grid-cols-${sm}`,
      md && `md:grid-cols-${md}`,
      lg && `lg:grid-cols-${lg}`,
      xl && `xl:grid-cols-${xl}`
    );
  };

  const gapClass = typeof gap === "number" ? `gap-${gap}` : `gap-${gap}`;

  return (
    <div
      className={cn("grid", getColsClass(), gapClass, className)}
      {...props}
    >
      {children}
    </div>
  );
}
