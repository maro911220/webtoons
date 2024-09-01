const bgColor = "#FF156D";
const strokeColor = "#a10";
export default function Loading({ size }: { size: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: size + "px", height: size + "px" }}
      className=" mx-auto"
      viewBox="0 0 200 200"
    >
      <radialGradient
        id="a10"
        cx=".66"
        fx=".66"
        cy=".3125"
        fy=".3125"
        gradientTransform="scale(1.5)"
      >
        <stop offset="0" stopColor={bgColor}></stop>
        <stop offset=".3" stopColor={bgColor} stopOpacity=".9"></stop>
        <stop offset=".6" stopColor={bgColor} stopOpacity=".6"></stop>
        <stop offset=".8" stopColor={bgColor} stopOpacity=".3"></stop>
        <stop offset="1" stopColor={bgColor} stopOpacity="0"></stop>
      </radialGradient>
      <circle
        style={{ transformOrigin: "center" }}
        fill="none"
        stroke={`url(${strokeColor})`}
        strokeWidth="15"
        strokeLinecap="round"
        strokeDasharray="200 1000"
        strokeDashoffset="0"
        cx="100"
        cy="100"
        r="70"
      >
        <animateTransform
          type="rotate"
          attributeName="transform"
          calcMode="spline"
          dur="2"
          values="360;0"
          keyTimes="0;1"
          keySplines="0 0 1 1"
          repeatCount="indefinite"
        ></animateTransform>
      </circle>
      <circle
        style={{ transformOrigin: "center" }}
        fill="none"
        opacity=".2"
        stroke={bgColor}
        strokeWidth="15"
        strokeLinecap="round"
        cx="100"
        cy="100"
        r="70"
      ></circle>
    </svg>
  );
}
