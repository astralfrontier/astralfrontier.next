import { getPosts, hrefOfPost } from "@/lib";
import Link from "next/link";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div>
      <main>
        <h1>Home</h1>
        <ul>
          {posts.map((post) => (
            <li key={`${post.category}-${post.slug}`}>
              <Link href={hrefOfPost(post)}>{post.title}</Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
