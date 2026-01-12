// Environment constants for type-safe environment checks

export const APP_ENV = {
  DEVELOPMENT: "development",
  PRODUCTION: "production",
  TEST: "test",
} as const;

export type AppEnv = (typeof APP_ENV)[keyof typeof APP_ENV];

/**
 * Check if current environment is development
 */
export function isDevelopment(): boolean {
  return process.env.NODE_ENV === APP_ENV.DEVELOPMENT;
}

/**
 * Check if current environment is production
 */
export function isProduction(): boolean {
  return process.env.NODE_ENV === APP_ENV.PRODUCTION;
}

/**
 * Check if running on server (not browser)
 */
export function isServer(): boolean {
  return typeof window === "undefined";
}
