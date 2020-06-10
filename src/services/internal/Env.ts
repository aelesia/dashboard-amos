export const Env = {
  ENVIRONMENT: env('REACT_APP_ENVIRONMENT')
}

function env(env: string): string {
  const envvar = process.env[env]
  if (envvar == null || envvar === '') {
    console.warn(`[Config.${env}] Not set in .env`)
  }
  return envvar as string
}
