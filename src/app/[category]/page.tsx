import { Metadata } from "next";

export default async function Post(props: Params) {
  const params = await props.params;

  return (
    <main>
      <h1>{params.category}</h1>
      <p>Posts found in this category: TODO</p>
    </main>
  );
}

// TODO: take this type from API definition
type Params = {
  params: Promise<{
    category: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const title = `${params.category}`;

  return {
    title,
    openGraph: {
      title,
    },
  };
}

export async function generateStaticParams() {
  // TODO: get from API call
  const posts = [{ category: "blog", id: "post" }];

  return posts.map((post) => ({
    category: post.category,
  }));
}
