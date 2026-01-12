import type { Post } from "../lib/posts.server";

interface Props {
  posts: Pick<Post, "createdAt">[];
}

export function LearningCalendar({ posts }: Props) {
  // Generate calendar for past 12 weeks
  const weeks = 12;
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() - weeks * 7 + (7 - startDate.getDay()));

  // Count posts per date
  const postCounts = new Map<string, number>();
  posts.forEach((post) => {
    const dateStr = post.createdAt.toISOString().split("T")[0];
    postCounts.set(dateStr, (postCounts.get(dateStr) || 0) + 1);
  });

  // Generate calendar data
  const calendar: { date: Date; count: number }[][] = [];
  for (let w = 0; w < weeks; w++) {
    const week: { date: Date; count: number }[] = [];
    for (let d = 0; d < 7; d++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + w * 7 + d);
      const dateStr = date.toISOString().split("T")[0];
      week.push({ date, count: postCounts.get(dateStr) || 0 });
    }
    calendar.push(week);
  }

  const getColorClass = (count: number) => {
    if (count === 0) return "bg-slate-100";
    if (count === 1) return "bg-orange-200";
    if (count === 2) return "bg-orange-400";
    return "bg-orange-500";
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="card p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <svg
          className="w-4 h-4 text-orange-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <h2 className="text-sm font-semibold text-slate-700">Activity</h2>
        <span className="text-xs text-slate-400 ml-auto">12 weeks</span>
      </div>

      {/* Calendar Grid */}
      <div className="flex gap-1 overflow-x-auto pb-2">
        {calendar.map((week, weekIdx) => (
          <div key={weekIdx} className="flex flex-col gap-1">
            {week.map((day, dayIdx) => (
              <div
                key={dayIdx}
                className={`w-3 h-3 rounded-sm transition-all duration-200 hover:scale-125 cursor-default ${getColorClass(
                  day.count
                )} ${isToday(day.date) ? "ring-2 ring-orange-500 ring-offset-1" : ""}`}
                title={`${day.date.toLocaleDateString("ja-JP")}: ${day.count} posts`}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="mt-3 flex items-center justify-center">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <span>Less</span>
          <div className="flex gap-0.5">
            <div className="w-3 h-3 rounded-sm bg-slate-100"></div>
            <div className="w-3 h-3 rounded-sm bg-orange-200"></div>
            <div className="w-3 h-3 rounded-sm bg-orange-400"></div>
            <div className="w-3 h-3 rounded-sm bg-orange-500"></div>
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-4 pt-4 border-t border-slate-100">
        <div className="flex items-center justify-around text-center">
          <div>
            <p className="text-xl font-bold text-slate-800">{posts.length}</p>
            <p className="text-xs text-slate-400">Total</p>
          </div>
          <div className="w-px h-8 bg-slate-100"></div>
          <div>
            <p className="text-xl font-bold text-slate-800">{postCounts.size}</p>
            <p className="text-xs text-slate-400">Days</p>
          </div>
        </div>
      </div>
    </div>
  );
}
