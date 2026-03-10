export function MovieOrbitIcon({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="7" fill="hsl(186,97%,35%)" />

      <circle cx="16" cy="16" r="2.2" fill="hsl(220,22%,4%)" />
      <circle cx="16" cy="11" r="1.2" fill="hsl(220,22%,4%)" />
      <circle cx="16" cy="21" r="1.2" fill="hsl(220,22%,4%)" />
      <circle cx="11" cy="16" r="1.2" fill="hsl(220,22%,4%)" />
      <circle cx="21" cy="16" r="1.2" fill="hsl(220,22%,4%)" />

      <ellipse
        cx="16"
        cy="16"
        rx="14"
        ry="5.5"
        stroke="hsl(43,100%,56%)"
        strokeWidth="1.5"
        fill="none"
        transform="rotate(-30 16 16)"
      />

      <circle cx="26.5" cy="10.5" r="2" fill="hsl(43,100%,56%)" />
    </svg>
  );
}
