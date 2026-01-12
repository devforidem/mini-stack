import { useState, useRef, useEffect } from "react";
import { techIcons, getIconUrl, type TechIcon } from "../lib/icons";

interface TechIconSelectProps {
  name: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

export function TechIconSelect({
  name,
  defaultValue = "docker",
  onChange,
}: TechIconSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const selectedIcon = techIcons[selectedValue] || techIcons.other;

  // Group icons by category
  const iconGroups = {
    Languages: [
      "javascript",
      "typescript",
      "python",
      "go",
      "rust",
      "php",
      "ruby",
      "java",
      "csharp",
      "swift",
      "kotlin",
      "dart",
    ],
    Frontend: [
      "react",
      "vue",
      "angular",
      "svelte",
      "nextjs",
      "astro",
      "tailwindcss",
      "html",
      "css",
    ],
    "Backend/Runtime": [
      "nodejs",
      "deno",
      "bun",
      "express",
      "fastapi",
      "django",
      "rails",
      "laravel",
    ],
    "Cloud/Infra": [
      "gcp",
      "azure",
      "vercel",
      "cloudflare",
      "netlify",
      "firebase",
      "supabase",
    ],
    "DevOps/Tools": [
      "docker",
      "kubernetes",
      "terraform",
      "ansible",
      "github",
      "gitlab",
      "git",
      "linux",
      "ubuntu",
      "nginx",
    ],
    Database: ["postgresql", "mysql", "mongodb", "redis", "sqlite", "prisma"],
    Mobile: ["flutter", "reactnative", "android", "ios"],
    "AI/ML": ["openai", "anthropic", "tensorflow", "pytorch"],
    Other: ["graphql", "vim", "vscode", "npm", "pnpm", "other"],
  };

  // Filter icons based on search query
  const filteredGroups = Object.entries(iconGroups).reduce(
    (acc, [group, keys]) => {
      const filteredKeys = keys.filter((key) => {
        const icon = techIcons[key];
        if (!icon) return false;
        const query = searchQuery.toLowerCase();
        return (
          icon.label.toLowerCase().includes(query) ||
          key.toLowerCase().includes(query)
        );
      });
      if (filteredKeys.length > 0) {
        acc[group] = filteredKeys;
      }
      return acc;
    },
    {} as Record<string, string[]>
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleSelect = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    setSearchQuery("");
    onChange?.(value);
  };

  return (
    <div ref={containerRef} className="relative">
      {/* Hidden input for form submission */}
      <input type="hidden" name={name} value={selectedValue} />

      {/* Trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-4 py-3 bg-white border border-slate-300 rounded-xl text-left transition-all duration-200 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
      >
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gray-50">
          <img
            src={getIconUrl(selectedIcon.slug, selectedIcon.color)}
            alt={selectedIcon.label}
            className="w-5 h-5"
          />
        </div>
        <span className="flex-1 text-sm font-medium text-slate-800">
          {selectedIcon.label}
        </span>
        <svg
          className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="dropdown-menu">
          {/* Search input */}
          <div className="sticky top-0 bg-white border-b border-slate-300 p-3">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-sm bg-gray-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>
          </div>

          {/* Grouped options */}
          <div className="py-2">
            {Object.entries(filteredGroups).map(([group, keys]) => (
              <div key={group}>
                <div className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {group}
                </div>
                {keys.map((key) => {
                  const icon = techIcons[key];
                  if (!icon) return null;
                  const isSelected = key === selectedValue;

                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleSelect(key)}
                      className={`dropdown-item w-full ${
                        isSelected ? "selected" : ""
                      }`}
                    >
                      <div
                        className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                          isSelected ? "bg-orange-100" : "bg-gray-50"
                        }`}
                      >
                        <img
                          src={getIconUrl(icon.slug, icon.color)}
                          alt={icon.label}
                          className="w-5 h-5"
                        />
                      </div>
                      <span className="flex-1 text-left">{icon.label}</span>
                      {isSelected && (
                        <svg
                          className="w-5 h-5 text-orange-500"
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
                      )}
                    </button>
                  );
                })}
              </div>
            ))}

            {Object.keys(filteredGroups).length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-slate-400">
                No technologies found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
