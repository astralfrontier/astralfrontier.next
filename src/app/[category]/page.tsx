import {
  getCategories,
  getCategoryBySlug,
  getPostsByCategory,
  hrefOfPost,
} from "@/lib";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function CategoryPage(props: Params) {
  const params = await props.params;
  const category = await getCategoryBySlug(params.category);

  if (!category) {
    notFound();
  }

  const posts = await getPostsByCategory(category.slug);

  return (
    <main>
      <h1>{category.name}</h1>
      <p>Posts found in this category:</p>
      <ul>
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={hrefOfPost(post)}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

type Params = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const category = await getCategoryBySlug(params.category);

  // TODO: Category not found

  const title = `${category?.name}`;

  return {
    title,
    openGraph: {
      title,
    },
  };
}

export async function generateStaticParams() {
  const categories = await getCategories();

  return categories.map((category) => ({
    category: category.slug,
  }));
}
