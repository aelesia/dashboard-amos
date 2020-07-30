export const Env = {
  ENVIRONMENT: envReact('REACT_APP_ENVIRONMENT'),
  BACKEND_URL: envReact('REACT_APP_BACKEND_URL')
}

function envReact(environment: string): string {
  if (!environment.startsWith('REACT_APP')) {
    console.warn(`[${environment}] Does not begin with REACT_APP`)
  }
  return env(environment)
}

function env(env: string): string {
  const envvar = process.env[env]
  if (envvar == null || envvar === '') {
    console.warn(`[${env}] Not set in .env`)
  }
  return envvar as string
}
