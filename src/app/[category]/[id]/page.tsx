import {
  getCategoryBySlug,
  getPostBySlug,
  getPosts,
  hrefOfCategory,
} from "@/lib";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PostPage(props: Params) {
  const params = await props.params;
  const post = await getPostBySlug(params.category, params.id);

  if (!post) {
    notFound();
  }

  const category = await getCategoryBySlug(post?.category);

  if (!category) {
    notFound();
  }

  return (
    <main>
      <h1>{post.title}</h1>
      <p>
        Category is{" "}
        <Link href={hrefOfCategory(category)}>{category?.name}</Link>
      </p>
    </main>
  );
}

type Params = {
  params: Promise<{
    category: string;
    id: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const post = await getPostBySlug(params.category, params.id);
  const title = `${post?.title}`;

  // TODO: post not found

  return {
    title,
    openGraph: {
      title,
    },
  };
}

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map((post) => ({
    category: post.category,
    id: post.slug,
  }));
}
