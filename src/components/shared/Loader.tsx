import { useTheme } from "@/hooks/use-theme";

const LoaderSVG = ({
  stroke,
  width,
  height,
}: {
  stroke: string;
  width: string;
  height: string;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 38 38"
    xmlns="http://www.w3.org/2000/svg"
    stroke={stroke}
  >
    <g fill="none" fill-rule="evenodd">
      <g transform="translate(1 1)" stroke-width="2">
        <circle stroke-opacity=".5" cx="18" cy="18" r="18" />
        <path d="M36 18c0-9.94-8.06-18-18-18">
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 18 18"
            to="360 18 18"
            dur="5s"
            repeatCount="indefinite"
          />
        </path>
      </g>
    </g>
  </svg>
);
const Loader = ({ color }: { color?: string }) => {
  const { theme } = useTheme();
  return (
    <div className="flex-center w-full">
      <LoaderSVG
        stroke={
          !color
            ? theme === "dark"
              ? "#000"
              : "#fff"
            : color === "white"
            ? "#fff"
            : "#000"
        }
        width="24"
        height="24"
      />
      {/* <img src="/assets/icons/loader.svg" alt="loader" width={24} height={24} /> */}
    </div>
  );
};

export default Loader;
