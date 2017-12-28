// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  API_URL: 'https://qa.lighthousesoftware.com/voyage-api-ms/api/v1',
  SIGNALR_URL: 'https://qa.lighthousesoftware.com/voyage-api-ms',
  SERVER_URL: 'https://qa.lighthousesoftware.com/voyage-ms-web',
  OAUTH_REDIRECT_URL: 'https://qa.lighthousesoftware.com/voyage-ms/',
  OAUTH_CLIENT_ID: 'client-super-qa',
  OAUTH_CLIENT_SECRET: 'secret',
  APP_HOME: '/voyage-ms/'
};
