/** StarBorder: animated glowing border that travels around the element's perimeter. Adapted from React Bits. */
import { type CSSProperties, type ElementType, type ReactNode } from "react";

interface StarBorderProps<T extends ElementType = "div"> {
  as?: T;
  className?: string;
  color?: string;
  speed?: string;
  thickness?: number;
  children: ReactNode;
  style?: CSSProperties;
  [key: string]: unknown;
}

export function StarBorder<T extends ElementType = "div">({
  as,
  className = "",
  color = "#009CA6",
  speed = "6s",
  thickness = 1,
  children,
  style,
  ...rest
}: StarBorderProps<T>) {
  const Tag = (as ?? "div") as ElementType;

  return (
    <Tag
      className={`star-border-wrapper relative ${className}`}
      style={
        {
          "--star-border-color": color,
          "--star-border-speed": speed,
          "--star-border-thickness": `${thickness}px`,
          ...style,
        } as CSSProperties
      }
      {...rest}
    >
      <span className="star-border-rail star-border-rail-bottom" aria-hidden="true" />
      <span className="star-border-rail star-border-rail-top" aria-hidden="true" />
      <span className="star-border-inner">{children}</span>
    </Tag>
  );
}

export default StarBorder;
