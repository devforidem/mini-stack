import { Form, useNavigation, redirect, Link } from "react-router";
import type { Route } from "./+types/admin.edit.$id";
import { getPost, updatePost, deletePost } from "../lib/posts.server";
import { Header } from "../components/Header";
import { TechIconSelect } from "../components/TechIconSelect";
import { isDevelopment } from "../lib/env";

export function meta({}: Route.MetaArgs) {
  return [{ title: "Edit Post - devdemdev" }];
}

export async function loader({ params }: Route.LoaderArgs) {
  if (!isDevelopment()) {
    throw new Response("Editing is not allowed in production", { status: 403 });
  }

  const post = await getPost(params.id);
  if (!post) {
    throw new Response("Post not found", { status: 404 });
  }

  return { post };
}

export async function action({ request, params }: Route.ActionArgs) {
  if (!isDevelopment()) {
    throw new Response("Editing is not allowed in production", { status: 403 });
  }

  const formData = await request.formData();
  const intent = formData.get("intent");

  if (intent === "delete") {
    await deletePost(params.id);
    return redirect("/");
  }

  const content = formData.get("content") as string;
  const techIcon = formData.get("techIcon") as string;

  if (!content || content.trim().length === 0) {
    return { error: "Content is required" };
  }

  // Validate techIcon against allowed list
  const { techIcons } = await import("../lib/icons");
  if (!techIcons[techIcon]) {
    return { error: "Invalid category selected" };
  }

  if (content.length > 200) {
    return { error: "Content must be 200 characters or less" };
  }

  await updatePost(params.id, content.trim(), techIcon);
  return redirect("/");
}

export default function EditPost({
  loaderData,
  actionData,
}: Route.ComponentProps) {
  const { post } = loaderData;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  if (!isDevelopment()) {
    return (
      <div className="min-h-screen bg-[#FFFBEB]">
        <Header />
        <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          <div className="card p-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <svg
                  className="w-6 h-6 text-amber-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-semibold text-slate-800 mb-1">
                  Production Mode
                </h2>
                <p className="text-sm text-slate-600">
                  Editing is disabled in production. Please run the development
                  server locally to edit posts.
                </p>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFBEB]">
      <Header />

      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
        {/* Page Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/" className="btn btn-ghost p-2" aria-label="Back to home">
            <svg
              className="w-5 h-5"
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
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Edit Post
            </h1>
            <p className="text-sm text-slate-400">
              Update your tech note
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div className="card p-6">
          <Form method="post" className="space-y-6">
            {/* Category Select */}
            <div>
              <label className="block text-sm font-medium text-slate-800 mb-2">
                Technology
              </label>
              <TechIconSelect name="techIcon" defaultValue={post.techIcon} />
            </div>

            {/* Content Textarea */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium text-slate-800"
                >
                  Content
                </label>
                <span className="text-xs text-slate-400">
                  Max 200 characters
                </span>
              </div>
              <textarea
                id="content"
                name="content"
                rows={5}
                maxLength={200}
                className="input resize-none"
                defaultValue={post.content}
              />
            </div>

            {/* Error Message */}
            {actionData?.error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                <svg
                  className="w-5 h-5 text-red-500 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm text-red-700">{actionData.error}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="submit"
                name="intent"
                value="update"
                disabled={isSubmitting}
                className="btn btn-primary flex-1 py-3"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Updating...
                  </>
                ) : (
                  <>
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
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Save Changes
                  </>
                )}
              </button>

              <button
                type="submit"
                name="intent"
                value="delete"
                disabled={isSubmitting}
                className="btn btn-danger py-3"
                onClick={(e) => {
                  if (!confirm("Are you sure you want to delete this post?")) {
                    e.preventDefault();
                  }
                }}
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
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
                Delete
              </button>
            </div>
          </Form>
        </div>

        {/* Post Info */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-400">
            Created:{" "}
            {new Intl.DateTimeFormat("ja-JP", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }).format(post.createdAt)}
          </p>
        </div>
      </main>
    </div>
  );
}
