import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { children: JSX.Element | string } & {
  color?: "primary" | "secondary" | "danger";
};

export function Button({ children, color, ...rest }: Props) {
  const bgColor = (() => {
    switch (color) {
      case "primary":
      default:
        return "bg-blue-500";
      case "secondary":
        return "bg-gray-400";
      case "danger":
        return "bg-red-500";
    }
  })();

  return (
    <button
      className={`items-center rounded-md ${bgColor} px-4 py-2  font-sans text-sm text-white`}
      {...rest}
    >
      {children}
    </button>
  );
}
