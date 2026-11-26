import { useId } from "react";

export function Cupon({
  descuento,
  diagonal,
  colorFondo,
  colorTexto,
  className,
}) {
  const maskId = useId();

  const rotacion = diagonal ? "rotate(-8 150 75)" : undefined;

  return (
    <svg
      viewBox="-25 -25 350 200"
      className={className}
      style={{
        width: "100%",
        height: "auto",
        filter: "drop-shadow(0 8px 12px rgba(0, 0, 0, 0.15))",
        overflow: "visible",
      }}
      xmlns="http://w3.org"
      role="img"
      aria-label={`Cupón de descuento del ${descuento}%`}
    >
      <defs>
        <mask id={maskId}>
          <rect x="0" y="0" width="300" height="150" rx="12" fill="white" />

          <circle cx="0" cy="75" r="18" fill="black" />
          <circle cx="300" cy="75" r="18" fill="black" />
        </mask>
      </defs>

      <g transform={rotacion}>
        <rect
          x="0"
          y="0"
          width="300"
          height="150"
          fill={colorFondo}
          mask={`url(#${maskId})`}
        />

        <rect
          x="10"
          y="10"
          width="280"
          height="130"
          rx="8"
          fill="none"
          stroke={colorTexto}
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeDasharray="6,6"
          mask={`url(#${maskId})`}
        />

        <text
          x="150"
          y="55"
          fontSize="18"
          fontWeight="700"
          fill={colorTexto}
          textAnchor="middle"
          letterSpacing="2"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          DESCUENTO:
        </text>

        <text
          x="150"
          y="115"
          fontSize="58"
          fontWeight="900"
          fill={colorTexto}
          textAnchor="middle"
          style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
        >
          {descuento}%
        </text>
      </g>
    </svg>
  );
}
