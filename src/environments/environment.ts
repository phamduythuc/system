// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
export const envConfig = {
  apiSSO: 'http://103.226.248.168:8082',
  baseUrl: window.location.origin,
  clientId: 'lifesup_hrm',
  scope: 'read',
};

export const environment = {
  production: false,
  baseUrl: window.location.origin,
  apiUrl: 'http://localhost:8089/api',
  apiSSO: `${envConfig.apiSSO}/api`,
  redirectUrl: `${envConfig.apiSSO}/auth?client_id=${envConfig.clientId}&redirect_uri=${envConfig.baseUrl}&scope=${envConfig.scope}`
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
