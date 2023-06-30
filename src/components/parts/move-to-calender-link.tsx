import Link from "next/link";

export function MoveToCalenderLink() {
  return (
    <div className="p-1 w-fit underline hover:text-blue-300">
      <Link href="/dashboard/calender">カレンダーへ</Link>
    </div>
  );
}
