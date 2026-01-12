import { useSearchParams } from "react-router";
import type { Route } from "./+types/home";
import { getPosts, getAllPostDates } from "../lib/posts.server";
import { PostCard } from "../components/PostCard";
import { Header } from "../components/Header";
import { LearningCalendar } from "../components/LearningCalendar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "devdemdev | Tech Notes" },
    { name: "description", content: "Daily tech learnings in bite-sized notes" },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = 20;
  const offset = (page - 1) * limit;

  const [result, allDates] = await Promise.all([
    getPosts({ limit, offset }),
    getAllPostDates(),
  ]);

  return {
    posts: result.posts,
    total: result.total,
    hasMore: result.hasMore,
    page,
    allDates,
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const { posts, total, hasMore, page, allDates } = loaderData;
  const [, setSearchParams] = useSearchParams();

  const goToPage = (newPage: number) => {
    setSearchParams({ page: newPage.toString() });
  };

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      <Header />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar - Calendar */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 lg:self-start">
            <LearningCalendar posts={allDates} />
          </aside>

          {/* Main Content - Timeline */}
          <div className="lg:col-span-8">
            {/* Section Header */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-slate-800">
                Posts
                <span className="ml-2 text-sm font-normal text-slate-400">
                  {total}
                </span>
              </h2>
            </div>

            {/* Posts List */}
            <div className="space-y-5">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>

            {/* Empty State */}
            {posts.length === 0 && (
              <div className="card p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-orange-100 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-orange-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">
                  No posts yet
                </h3>
                <p className="text-sm text-slate-500">
                  Start sharing your tech learnings!
                </p>
              </div>
            )}

            {/* Pagination */}
            {total > 20 && (
              <div className="mt-8 flex items-center justify-center gap-2">
                <button
                  onClick={() => goToPage(page - 1)}
                  disabled={page === 1}
                  className="btn btn-secondary"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  Previous
                </button>

                <div className="flex items-center gap-1 px-4">
                  {/* Page numbers */}
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter((p) => {
                      // Show first, last, current, and adjacent pages
                      return (
                        p === 1 ||
                        p === totalPages ||
                        Math.abs(p - page) <= 1
                      );
                    })
                    .map((p, idx, arr) => {
                      // Add ellipsis if there's a gap
                      const showEllipsisBefore =
                        idx > 0 && p - arr[idx - 1] > 1;

                      return (
                        <span key={p} className="flex items-center">
                          {showEllipsisBefore && (
                            <span className="px-2 text-slate-400">...</span>
                          )}
                          <button
                            onClick={() => goToPage(p)}
                            className={`w-10 h-10 rounded-xl text-sm font-medium transition-all duration-200 ${
                              p === page
                                ? "bg-orange-500 text-white shadow-md"
                                : "text-slate-600 hover:bg-gray-100"
                            }`}
                          >
                            {p}
                          </button>
                        </span>
                      );
                    })}
                </div>

                <button
                  onClick={() => goToPage(page + 1)}
                  disabled={!hasMore}
                  className="btn btn-secondary"
                >
                  Next
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
