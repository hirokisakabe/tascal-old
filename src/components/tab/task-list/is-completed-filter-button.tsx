import { FunnelIcon } from "@heroicons/react/24/solid";

export function IsCompletedFilterButton({
  excludeIsCompleted,
  onClick,
}: {
  excludeIsCompleted: boolean;
  onClick: () => unknown;
}) {
  return (
    <>
      <button onClick={onClick}>
        {excludeIsCompleted ? (
          <FunnelIcon className="w-8 fill-transparent stroke-black" />
        ) : (
          <FunnelIcon className="w-8 stroke-black" />
        )}
      </button>
    </>
  );
}
