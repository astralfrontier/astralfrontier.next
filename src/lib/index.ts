// Support methods and functions for blog content

export interface BlogCategory {
  name: string;
  slug: string;
}

export interface BlogPost {
  category: string; // A slug
  title: string;
  slug: string;
  // TODO: metadata, front matter, content, etc.
}

let categories: BlogCategory[];
let posts: BlogPost[];

export async function getCategories(): Promise<BlogCategory[]> {
  if (categories !== undefined) {
    return categories;
  }

  // TODO: read from disk
  categories = [
    {
      name: "My Category",
      slug: "my-category",
    },
  ];

  return categories;
}

export async function getPosts(): Promise<BlogPost[]> {
  if (posts !== undefined) {
    return posts;
  }

  // TODO: read from disk
  posts = [
    {
      category: "my-category",
      title: "My Post",
      slug: "my-post",
    },
  ];

  return posts;
}

export async function getCategoryBySlug(
  slug: string
): Promise<BlogCategory | undefined> {
  const categories = await getCategories();
  return categories.find((category) => category.slug == slug);
}

export async function getPostBySlug(
  category: string,
  slug: string
): Promise<BlogPost | undefined> {
  const posts = await getPosts();
  return posts.find((post) => post.category == category && post.slug == slug);
}
