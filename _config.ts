import lume from "lume/mod.ts";
import blog from "blog/mod.ts";
import plugins from "./plugins.ts";
import nunjucks from "lume/plugins/nunjucks.ts";
import { getCategories } from "./getCategories.ts";
import matter from "gray-matter";

const site = lume({
  src: "./src",
});

site.use(plugins());
site.use(nunjucks());

async function generateCategoryPages() {
  const categorizedPosts = await getCategories();

  for (const category in categorizedPosts) {
    const posts = categorizedPosts[category];
    let pageContent = `---
title: "${category}の投稿"
---

<ul>
`;

    posts.forEach(post => {
      pageContent += `<li>${post.title} - ${post.date}</li>\n`;
    });

    pageContent += `</ul>\n`;

    const filePath = `./src/posts/${category}.md`;

    // ファイルに書き込む
    await Deno.writeTextFile(filePath, pageContent);

    console.log(`Generated ${filePath}`);
  }
}

await generateCategoryPages();

export default site;

