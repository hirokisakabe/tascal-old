import { Title } from "@tremor/react";
import { HeaderMenu } from "./header-menu";

export function Header() {
  return (
    <div className="flex pt-2">
      <div className="w-full">
        <Title>Tascal</Title>
      </div>
      <div className="flex justify-end">
        <HeaderMenu />
      </div>
    </div>
  );
}
