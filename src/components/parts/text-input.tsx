import { DetailedHTMLProps, InputHTMLAttributes, forwardRef } from "react";

type Props = Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "type"
>;

// eslint-disable-next-line react/display-name
export const TextInput = forwardRef<HTMLInputElement, Props>((props, ref) => (
  <input
    className="w-full rounded-md border border-gray-300 px-3 py-2"
    type="text"
    ref={ref}
    {...props}
  />
));
