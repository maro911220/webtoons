const bgColor = "#FF156D";
const strokeColor = "#a10";

export default function Loading({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className="mx-auto"
      viewBox="0 0 200 200"
    >
      <radialGradient
        id="grad1"
        cx="0.66"
        fx="0.66"
        cy="0.3125"
        fy="0.3125"
        gradientTransform="scale(1.5)"
      >
        <stop offset="0" stopColor={bgColor}></stop>
        <stop offset="0.3" stopColor={bgColor} stopOpacity="0.9"></stop>
        <stop offset="0.6" stopColor={bgColor} stopOpacity="0.6"></stop>
        <stop offset="0.8" stopColor={bgColor} stopOpacity="0.3"></stop>
        <stop offset="1" stopColor={bgColor} stopOpacity="0"></stop>
      </radialGradient>
      <circle
        style={{ transformOrigin: "center" }}
        fill="none"
        stroke={strokeColor}
        strokeWidth="15"
        strokeLinecap="round"
        strokeDasharray="200 1000"
        cx="100"
        cy="100"
        r="70"
      >
        <animateTransform
          type="rotate"
          attributeName="transform"
          calcMode="spline"
          dur="2s"
          values="360;0"
          keyTimes="0;1"
          keySplines="0 0 1 1"
          repeatCount="indefinite"
        />
      </circle>
      <circle
        style={{ transformOrigin: "center" }}
        fill="none"
        opacity="0.2"
        stroke={bgColor}
        strokeWidth="15"
        strokeLinecap="round"
        cx="100"
        cy="100"
        r="70"
      />
    </svg>
  );
}
