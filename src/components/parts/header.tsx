import { Title } from "@tremor/react";
import { SignOutButton } from "./signout-button";

export function Header() {
  return (
    <div className="pt-3 flex">
      <div className="w-full">
        <Title>Tascal</Title>
      </div>
      <div className="flex justify-end">
        <SignOutButton />
      </div>
    </div>
  );
}
