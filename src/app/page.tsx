import Link from "next/link";

export default function Home() {
  return (
    <div>
      <main>
        <h1>Home</h1>
        <Link href="/my-category/my-post/">Sample Post</Link>
      </main>
    </div>
  );
}
