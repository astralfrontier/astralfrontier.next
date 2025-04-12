import { Metadata } from "next";

export default async function Post(props: Params) {
  const params = await props.params;

  return (
    <main>
      <h1>{params.slug}</h1>
    </main>
  );
}

type Params = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata(props: Params): Promise<Metadata> {
  const params = await props.params;
  const title = `${params.slug}`;

  return {
    title,
    openGraph: {
      title,
    },
  };
}

export async function generateStaticParams() {
  // TODO: get from API call
  const posts = ["foo", "bar"];

  return posts.map((post) => ({
    slug: post,
  }));
}
