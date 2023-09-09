import { Title } from "@tremor/react";
import { SignOutButton } from "./signout-button";
import { CreateCategoryButton } from "./create-category-button";

export function Header() {
  return (
    <div className="flex pt-2">
      <div className="w-full">
        <Title>Tascal</Title>
      </div>
      <div className="flex justify-end">
        <CreateCategoryButton />
        <SignOutButton />
      </div>
    </div>
  );
}
