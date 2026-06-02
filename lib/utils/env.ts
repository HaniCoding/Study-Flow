function getEnvVar(name: string, required = false): string {
  const value = process.env[name];
  if (!value && required) {
    if (typeof window === 'undefined') {
      console.warn(`Missing required environment variable: ${name}`);
    }
    return '';
  }
  return value || '';
}

export const env = {
  supabaseUrl: getEnvVar('NEXT_PUBLIC_SUPABASE_URL'),
  supabaseAnonKey: getEnvVar('NEXT_PUBLIC_SUPABASE_ANON_KEY'),
  clerkPublishableKey: getEnvVar('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY'),
  appUrl: getEnvVar('NEXT_PUBLIC_APP_URL', true) || 'http://localhost:3000',
  groqApiKey: getEnvVar('GROQ_API_KEY'),
  geminiApiKey: getEnvVar('GEMINI_API_KEY'),
  openrouterApiKey: getEnvVar('OPENROUTER_API_KEY'),
  isDev: process.env.NODE_ENV === 'development',
  isProd: process.env.NODE_ENV === 'production',
} as const;

export function validateEnv(): string[] {
  const errors: string[] = [];

  if (!env.supabaseUrl) errors.push('NEXT_PUBLIC_SUPABASE_URL is missing');
  if (!env.supabaseAnonKey) errors.push('NEXT_PUBLIC_SUPABASE_ANON_KEY is missing');
  if (!env.clerkPublishableKey) errors.push('NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is missing');

  return errors;
}