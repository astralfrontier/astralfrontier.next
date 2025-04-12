import { getCategories, getCategoryBySlug } from "@/lib";
import { Metadata } from "next";

export default async function CategoryPage(props: Params) {
  const params = await props.params;
  const category = await getCategoryBySlug(params.category);

  if (!category) {
    // TODO: category not found
    return;
  }

  return (
    <main>
      <h1>{category.name}</h1>
      <p>Posts found in this category: TODO</p>
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

  // TODO: category not found

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
