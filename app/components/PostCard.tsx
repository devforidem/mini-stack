import { Link } from "react-router";
import { getTechIcon, getIconUrl } from "../lib/icons";
import type { Post } from "../lib/posts.server";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const icon = getTechIcon(post.techIcon);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  // Extract code blocks (```language\n...\n```)
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/;
  const match = post.content.match(codeBlockRegex);
  const hasCodeBlock = !!match;
  const textContent = hasCodeBlock
    ? post.content.replace(codeBlockRegex, "").trim()
    : post.content;
  const codeLanguage = match?.[1] || "text";
  const codeContent = match?.[2]?.trim() || "";

  return (
    <article className="card card-hover overflow-hidden group">
      {/* Header - icon and metadata */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center justify-center w-10 h-10 rounded-xl ${icon.bgColor} transition-transform duration-200 group-hover:scale-105`}
          >
            <img
              src={getIconUrl(icon.slug, icon.color)}
              alt={icon.label}
              className="w-5 h-5"
            />
          </div>
          <div>
            <span className="text-sm font-semibold text-slate-800">
              {icon.label}
            </span>
            <div className="flex items-center gap-2 mt-0.5">
              <time className="text-xs text-slate-400">
                {formatDate(post.createdAt)}
              </time>
            </div>
          </div>
        </div>
        {process.env.NODE_ENV === "development" && (
          <Link
            to={`/admin/edit/${post.id}`}
            className="text-xs text-slate-400 hover:text-orange-500 transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100"
          >
            <svg
              className="w-3.5 h-3.5"
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
            編集
          </Link>
        )}
      </div>

      {/* Content */}
      <div className="px-5 py-5">
        <p className="text-slate-800 text-base leading-relaxed whitespace-pre-wrap">
          <FormattedContent content={textContent} />
        </p>

        {hasCodeBlock && (
          <div className="mt-4 rounded-xl overflow-hidden bg-slate-900 shadow-inner">
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-800/50 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                </div>
                <span className="text-xs text-slate-400 font-mono ml-2">
                  {codeLanguage}
                </span>
              </div>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(codeContent)}
                className="text-xs text-slate-400 hover:text-slate-200 transition-colors flex items-center gap-1"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                  />
                </svg>
                Copy
              </button>
            </div>
            <pre className="p-4 text-sm overflow-x-auto">
              <code className="text-slate-100 font-mono leading-relaxed">
                {codeContent}
              </code>
            </pre>
          </div>
        )}
      </div>
    </article>
  );
}

function FormattedContent({ content }: { content: string }) {
  // Check if content has inline code
  if (!content.includes("`")) {
    return <>{content}</>;
  }

  // Split by backticks and format inline code
  const parts = content.split(/(`[^`]+`)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code
              key={i}
              className="px-1.5 py-0.5 bg-orange-100 rounded-md text-sm font-mono text-orange-700"
            >
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}
