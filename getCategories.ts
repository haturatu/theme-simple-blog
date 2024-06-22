import { walk } from "https://deno.land/std/fs/mod.ts";
import matter from "gray-matter";

interface Post {
  title: string;
  date: string;
  categories?: string[];
  tags?: string[];
}

export async function getCategories() {
  let categorizedPosts: { [key: string]: Post[] } = {};

  for await (const entry of walk("./src/posts", { exts: [".md"] })) {
    const content = await Deno.readTextFile(entry.path);
    const { data } = matter(content);
    const categories = data.categories || [];

    for (const category of categories) {
      if (!categorizedPosts[category]) {
        categorizedPosts[category] = [];
      }
      categorizedPosts[category].push({
        title: data.title,
        date: data.date,
        categories: data.categories,
        tags: data.tags,
      });
    }
  }

  return categorizedPosts;
}

