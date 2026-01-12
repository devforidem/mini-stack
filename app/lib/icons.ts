// Simple Icons CDN: https://cdn.simpleicons.org/{icon}/{color}
// Color is hex without #

export interface TechIcon {
  slug: string; // Simple Icons slug
  label: string;
  color: string; // Icon color (hex without #)
  bgColor: string; // Background color class
}

export const techIcons: Record<string, TechIcon> = {
  // Languages
  javascript: { slug: "javascript", label: "JavaScript", color: "F7DF1E", bgColor: "bg-yellow-50" },
  typescript: { slug: "typescript", label: "TypeScript", color: "3178C6", bgColor: "bg-blue-50" },
  python: { slug: "python", label: "Python", color: "3776AB", bgColor: "bg-blue-50" },
  go: { slug: "go", label: "Go", color: "00ADD8", bgColor: "bg-cyan-50" },
  rust: { slug: "rust", label: "Rust", color: "000000", bgColor: "bg-orange-50" },
  php: { slug: "php", label: "PHP", color: "777BB4", bgColor: "bg-purple-50" },
  ruby: { slug: "ruby", label: "Ruby", color: "CC342D", bgColor: "bg-red-50" },
  java: { slug: "openjdk", label: "Java", color: "437291", bgColor: "bg-orange-50" },
  csharp: { slug: "csharp", label: "C#", color: "512BD4", bgColor: "bg-purple-50" },
  swift: { slug: "swift", label: "Swift", color: "F05138", bgColor: "bg-orange-50" },
  kotlin: { slug: "kotlin", label: "Kotlin", color: "7F52FF", bgColor: "bg-purple-50" },
  dart: { slug: "dart", label: "Dart", color: "0175C2", bgColor: "bg-blue-50" },

  // Frontend
  react: { slug: "react", label: "React", color: "61DAFB", bgColor: "bg-cyan-50" },
  vue: { slug: "vuedotjs", label: "Vue.js", color: "4FC08D", bgColor: "bg-green-50" },
  angular: { slug: "angular", label: "Angular", color: "DD0031", bgColor: "bg-red-50" },
  svelte: { slug: "svelte", label: "Svelte", color: "FF3E00", bgColor: "bg-orange-50" },
  nextjs: { slug: "nextdotjs", label: "Next.js", color: "000000", bgColor: "bg-gray-100" },
  astro: { slug: "astro", label: "Astro", color: "BC52EE", bgColor: "bg-purple-50" },
  tailwindcss: { slug: "tailwindcss", label: "Tailwind CSS", color: "06B6D4", bgColor: "bg-cyan-50" },
  html: { slug: "html5", label: "HTML", color: "E34F26", bgColor: "bg-orange-50" },
  css: { slug: "css3", label: "CSS", color: "1572B6", bgColor: "bg-blue-50" },

  // Backend/Runtime
  nodejs: { slug: "nodedotjs", label: "Node.js", color: "339933", bgColor: "bg-green-50" },
  deno: { slug: "deno", label: "Deno", color: "000000", bgColor: "bg-gray-100" },
  bun: { slug: "bun", label: "Bun", color: "000000", bgColor: "bg-yellow-50" },
  express: { slug: "express", label: "Express", color: "000000", bgColor: "bg-gray-100" },
  fastapi: { slug: "fastapi", label: "FastAPI", color: "009688", bgColor: "bg-teal-50" },
  django: { slug: "django", label: "Django", color: "092E20", bgColor: "bg-green-50" },
  rails: { slug: "rubyonrails", label: "Rails", color: "CC0000", bgColor: "bg-red-50" },
  laravel: { slug: "laravel", label: "Laravel", color: "FF2D20", bgColor: "bg-red-50" },

  // Cloud/Infra
  aws: { slug: "amazonwebservices", label: "AWS", color: "232F3E", bgColor: "bg-orange-50" },
  gcp: { slug: "googlecloud", label: "GCP", color: "4285F4", bgColor: "bg-blue-50" },
  azure: { slug: "microsoftazure", label: "Azure", color: "0078D4", bgColor: "bg-blue-50" },
  vercel: { slug: "vercel", label: "Vercel", color: "000000", bgColor: "bg-gray-100" },
  cloudflare: { slug: "cloudflare", label: "Cloudflare", color: "F38020", bgColor: "bg-orange-50" },
  netlify: { slug: "netlify", label: "Netlify", color: "00C7B7", bgColor: "bg-teal-50" },
  firebase: { slug: "firebase", label: "Firebase", color: "FFCA28", bgColor: "bg-yellow-50" },
  supabase: { slug: "supabase", label: "Supabase", color: "3FCF8E", bgColor: "bg-green-50" },

  // DevOps/Tools
  docker: { slug: "docker", label: "Docker", color: "2496ED", bgColor: "bg-blue-50" },
  kubernetes: { slug: "kubernetes", label: "Kubernetes", color: "326CE5", bgColor: "bg-blue-50" },
  terraform: { slug: "terraform", label: "Terraform", color: "7B42BC", bgColor: "bg-purple-50" },
  ansible: { slug: "ansible", label: "Ansible", color: "EE0000", bgColor: "bg-red-50" },
  github: { slug: "github", label: "GitHub", color: "181717", bgColor: "bg-gray-100" },
  gitlab: { slug: "gitlab", label: "GitLab", color: "FC6D26", bgColor: "bg-orange-50" },
  git: { slug: "git", label: "Git", color: "F05032", bgColor: "bg-red-50" },
  linux: { slug: "linux", label: "Linux", color: "FCC624", bgColor: "bg-yellow-50" },
  ubuntu: { slug: "ubuntu", label: "Ubuntu", color: "E95420", bgColor: "bg-orange-50" },
  nginx: { slug: "nginx", label: "Nginx", color: "009639", bgColor: "bg-green-50" },

  // Database
  postgresql: { slug: "postgresql", label: "PostgreSQL", color: "4169E1", bgColor: "bg-blue-50" },
  mysql: { slug: "mysql", label: "MySQL", color: "4479A1", bgColor: "bg-blue-50" },
  mongodb: { slug: "mongodb", label: "MongoDB", color: "47A248", bgColor: "bg-green-50" },
  redis: { slug: "redis", label: "Redis", color: "DC382D", bgColor: "bg-red-50" },
  sqlite: { slug: "sqlite", label: "SQLite", color: "003B57", bgColor: "bg-blue-50" },
  prisma: { slug: "prisma", label: "Prisma", color: "2D3748", bgColor: "bg-gray-100" },

  // Mobile
  flutter: { slug: "flutter", label: "Flutter", color: "02569B", bgColor: "bg-blue-50" },
  reactnative: { slug: "react", label: "React Native", color: "61DAFB", bgColor: "bg-cyan-50" },
  android: { slug: "android", label: "Android", color: "3DDC84", bgColor: "bg-green-50" },
  ios: { slug: "apple", label: "iOS", color: "000000", bgColor: "bg-gray-100" },

  // AI/ML
  openai: { slug: "openai", label: "OpenAI", color: "412991", bgColor: "bg-purple-50" },
  anthropic: { slug: "anthropic", label: "Anthropic", color: "191919", bgColor: "bg-gray-100" },
  tensorflow: { slug: "tensorflow", label: "TensorFlow", color: "FF6F00", bgColor: "bg-orange-50" },
  pytorch: { slug: "pytorch", label: "PyTorch", color: "EE4C2C", bgColor: "bg-red-50" },

  // Other
  graphql: { slug: "graphql", label: "GraphQL", color: "E10098", bgColor: "bg-pink-50" },
  vim: { slug: "vim", label: "Vim", color: "019733", bgColor: "bg-green-50" },
  vscode: { slug: "visualstudiocode", label: "VS Code", color: "007ACC", bgColor: "bg-blue-50" },
  npm: { slug: "npm", label: "npm", color: "CB3837", bgColor: "bg-red-50" },
  pnpm: { slug: "pnpm", label: "pnpm", color: "F69220", bgColor: "bg-orange-50" },
  other: { slug: "markdown", label: "Other", color: "000000", bgColor: "bg-gray-100" },
};

export function getIconUrl(slug: string, color: string): string {
  return `https://cdn.simpleicons.org/${slug}/${color}`;
}

export const techIconOptions = Object.entries(techIcons).map(([value, { label }]) => ({
  value,
  label,
}));

export function getTechIcon(key: string): TechIcon {
  return techIcons[key] || techIcons.other;
}
