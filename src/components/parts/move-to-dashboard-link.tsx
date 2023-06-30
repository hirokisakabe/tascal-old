import Link from "next/link";

export function MoveToDashboardLink() {
  return (
    <div className="p-1 w-fit underline hover:text-blue-300">
      <Link href="/dashboard">ダッシュボードへ</Link>
    </div>
  );
}
