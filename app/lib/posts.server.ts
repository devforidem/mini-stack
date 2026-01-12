// Import posts data directly (works in both Node.js and browser)
import postsData from "../../content/posts.json";

export interface Post {
  id: string;
  content: string;
  techIcon: string;
  createdAt: Date;
}

interface PostData {
  id: string;
  content: string;
  techIcon: string;
  createdAt: string;
}

// In-memory cache of posts (initialized from imported JSON)
let postsCache: PostData[] = [...postsData];

function readPostsFile(): PostData[] {
  return postsCache;
}

async function writePostsFile(posts: PostData[]): Promise<void> {
  // Update cache
  postsCache = posts;

  // Write to file only in development (Node.js environment)
  if (typeof window === "undefined" && process.env.NODE_ENV === "development") {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const POSTS_FILE = path.join(process.cwd(), "content/posts.json");
    await fs.writeFile(POSTS_FILE, JSON.stringify(posts, null, 2), "utf-8");
  }
}

export interface GetPostsOptions {
  limit?: number;
  offset?: number;
}

export interface GetPostsResult {
  posts: Post[];
  total: number;
  hasMore: boolean;
}

export function getPosts(options: GetPostsOptions = {}): GetPostsResult {
  const { limit = 20, offset = 0 } = options;

  const allPosts = readPostsFile();

  // Sort by createdAt descending
  const sorted = allPosts.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  const total = sorted.length;
  const paginated = sorted.slice(offset, offset + limit);

  const posts = paginated.map((p) => ({
    id: p.id,
    content: p.content,
    techIcon: p.techIcon,
    createdAt: new Date(p.createdAt),
  }));

  return {
    posts,
    total,
    hasMore: offset + limit < total,
  };
}

export function getAllPostDates(): { createdAt: Date }[] {
  const allPosts = readPostsFile();
  return allPosts.map((p) => ({ createdAt: new Date(p.createdAt) }));
}

export function getPost(id: string): Post | null {
  const posts = readPostsFile();
  const post = posts.find((p) => p.id === id);
  if (!post) return null;
  return {
    id: post.id,
    content: post.content,
    techIcon: post.techIcon,
    createdAt: new Date(post.createdAt),
  };
}

export async function createPost(
  content: string,
  techIcon: string
): Promise<string> {
  const id = Date.now().toString();
  const newPost: PostData = {
    id,
    content,
    techIcon,
    createdAt: new Date().toISOString(),
  };

  const posts = [...readPostsFile()];
  posts.push(newPost);
  await writePostsFile(posts);

  return id;
}

export async function updatePost(
  id: string,
  content: string,
  techIcon: string
): Promise<boolean> {
  const posts = [...readPostsFile()];
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return false;

  posts[index] = {
    ...posts[index],
    content,
    techIcon,
  };
  await writePostsFile(posts);
  return true;
}

export async function deletePost(id: string): Promise<boolean> {
  const posts = [...readPostsFile()];
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return false;

  posts.splice(index, 1);
  await writePostsFile(posts);
  return true;
}
