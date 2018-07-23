// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng serve --env=devjava` then `environment.devjava.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  API_URL: 'http://localhost:8080/api/v1',
  SERVER_URL: 'http://localhost:8080',
  OAUTH_REDIRECT_URL: 'http://localhost:3000/dashboard',
  OAUTH_CLIENT_ID: 'client-super',
  OAUTH_CLIENT_SECRET: 'secret'
};
