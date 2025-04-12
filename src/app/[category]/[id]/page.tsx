import { getCategoryBySlug, getPostBySlug, getPosts } from "@/lib";
import { Metadata } from "next";

export default async function PostPage(props: Params) {
  const params = await props.params;
  const post = await getPostBySlug(params.category, params.id);

  if (!post) {
    // TODO: post not found
    return;
  }

  const category = await getCategoryBySlug(post?.category);

  if (!category) {
    // TODO: category not found
    return;
  }

  return (
    <main>
      <h1>{post.title}</h1>
      <p>Category is {category?.name}</p>
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
