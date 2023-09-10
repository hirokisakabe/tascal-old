import { Typography } from "../parts";
import { HeaderMenu } from "./header-menu";

export function Header() {
  return (
    <div className="flex pt-2">
      <div className="w-full">
        <Typography size="text-xl">Tascal</Typography>
      </div>
      <div className="flex justify-end">
        <HeaderMenu />
      </div>
    </div>
  );
}
