import { getAllPostMeta, getAllTags, getAllCategories } from "@/lib/posts";
import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostMeta();
  const tags = getAllTags();
  const categories = getAllCategories();

  const postUrls = posts.map((post) => ({
    url: `https://blog.machcomputing.com/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  const tagUrls = tags.map(({ tag }) => ({
    url: `https://blog.machcomputing.com/tags/${encodeURIComponent(tag)}`,
    lastModified: new Date(),
  }));

  const categoryUrls = categories.map(({ category }) => ({
    url: `https://blog.machcomputing.com/categories/${encodeURIComponent(category)}`,
    lastModified: new Date(),
  }));

  return [
    { url: "https://blog.machcomputing.com", lastModified: new Date() },
    { url: "https://blog.machcomputing.com/blog", lastModified: new Date() },
    { url: "https://blog.machcomputing.com/tags", lastModified: new Date() },
    {
      url: "https://blog.machcomputing.com/categories",
      lastModified: new Date(),
    },
    ...postUrls,
    ...tagUrls,
    ...categoryUrls,
  ];
}
