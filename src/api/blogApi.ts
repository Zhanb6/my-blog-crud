// src/api/blogApi.ts
import { Blog } from "../types/blog";

const posts: Blog[] = [];

function delay(ms = 500) {
  return new Promise<void>(res => setTimeout(res, ms));
}

export async function getPosts(page = 1, pageSize = 10): Promise<{ data: Blog[]; total: number }> {
  await delay();
  const active = posts.filter(p => !p.deleted);
  const start = (page - 1) * pageSize;
  return { data: active.slice(start, start + pageSize), total: active.length };
}

export async function getPostById(id: string): Promise<Blog | undefined> {
  await delay();
  return posts.find(p => p.id === id && !p.deleted);
}

export async function createPost(payload: Omit<Blog, "id" | "deleted">): Promise<Blog> {
  await delay();
  const newPost: Blog = { ...payload, id: Date.now().toString(), deleted: false };
  posts.unshift(newPost);
  return newPost;
}

export async function updatePost(id: string, data: Partial<Omit<Blog, "id">>): Promise<Blog | undefined> {
  await delay();
  const idx = posts.findIndex(p => p.id === id);
  if (idx === -1) return;
  posts[idx] = { ...posts[idx], ...data };
  return posts[idx];
}

export async function deletePost(id: string): Promise<boolean> {
  await delay();
  const idx = posts.findIndex(p => p.id === id);
  if (idx === -1) return false;
  posts[idx].deleted = true;
  return true;
}
export { delay };
