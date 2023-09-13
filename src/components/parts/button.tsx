import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & { children: JSX.Element | string };

export function Button({ children, ...rest }: Props) {
  return (
    <button
      className="items-center rounded-md bg-blue-500 px-4 py-2  font-sans text-sm text-white"
      {...rest}
    >
      {children}
    </button>
  );
}
