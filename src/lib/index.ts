import path from "node:path";
import { globSync } from "glob";
import { readFileSync } from "node:fs";

// A short, URL-safe version of an object
// Slugs are expected to be unique within their namespace (e.g. all posts within a category)
type BlogSlug = string;

export interface BlogCategory {
  name: string;
  slug: BlogSlug;
}

export interface BlogPost {
  category: BlogSlug;
  title: string;
  slug: BlogSlug;
  contents: string;
  // TODO: metadata, front matter, content, etc.
}

// NEXTJS_ROOT is set up in next.config.ts
const CONTENT_ROOT = path.join(process.env.NEXTJS_ROOT || ".", "content");

let categories: BlogCategory[];
let posts: BlogPost[];

function readPost(postPath: string): BlogPost {
  const contents = readFileSync(postPath).toString();

  const postSlug = path.basename(postPath, ".md");
  const categorySlug = path.relative(CONTENT_ROOT, path.dirname(postPath));

  return {
    category: categorySlug,
    title: "My Blog Post",
    slug: postSlug,
    contents,
  };
}

// Read content from disk,
async function readContent() {
  console.log(CONTENT_ROOT);

  const paths = await globSync("**/*.md", {
    cwd: CONTENT_ROOT,
    dot: true,
    withFileTypes: true,
  });

  posts = paths.map((path) => readPost(path.fullpath()));
  categories = [
    {
      name: "Blog",
      slug: "blog",
    },
  ];
}

export async function getCategories(): Promise<BlogCategory[]> {
  if (categories === undefined) {
    await readContent();
  }

  return categories;
}

export async function getPosts(): Promise<BlogPost[]> {
  if (posts === undefined) {
    await readContent();
  }

  return posts;
}

// Find a single category by its slug
// TODO: do a map lookup, find() is bullshit
export async function getCategoryBySlug(
  slug: string
): Promise<BlogCategory | undefined> {
  const categories = await getCategories();
  return categories.find((category) => category.slug == slug);
}

// Find a single post by its slug
// TODO: do a map lookup, find() is bullshit
export async function getPostBySlug(
  category: string,
  slug: string
): Promise<BlogPost | undefined> {
  const posts = await getPosts();
  return posts.find((post) => post.category == category && post.slug == slug);
}

// Given a category, return (unsorted) posts from that category
export async function getPostsByCategory(
  category: string
): Promise<BlogPost[]> {
  const posts = await getPosts();
  return posts.filter((post) => post.category == category);
}

// Given a category, return its canonical URL
export function hrefOfCategory(category: BlogCategory): string {
  return `/${category.slug}/`;
}

// Given a post, return its canonical URL
export function hrefOfPost(post: BlogPost): string {
  return `/${post.category}/${post.slug}/`;
}
