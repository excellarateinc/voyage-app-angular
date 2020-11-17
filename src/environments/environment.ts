// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  API_URL: 'http://localhost:8080/api/v1',
  SERVER_URL: 'http://localhost:52431',
  OAUTH_SERVER_URL: 'http://localhost:8180/auth/',
  OAUTH_REDIRECT_URL: 'http://localhost:3000/dashboard',
  OUATH_REALM: 'VoyageBaseRealm',
  OAUTH_CLIENT_ID: 'client-super',
  OAUTH_CLIENT_SECRET: '671bb469-14a7-489a-83d4-9322ef04d171'
};
