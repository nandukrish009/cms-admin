// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth0: {
    domain: 'dev-h0r0i70d48kv3b68.us.auth0.com',
    clientId: 'RD0wIcgkLe6tSHfnbrmYy66GxJpmaz8z',
    // redirectUri: 'http://localhost:4200/data-table',
    authorizationParams: {
      audience: 'https://dev-h0r0i70d48kv3b68.us.auth0.com/api/v2/',
      redirect_uri: 'http://localhost:4200/data-table',
      scope: 'openid profile',
    },
  },
};
// export const environment = {
//   production: false,
//   auth: {
//     clientID: 'drMCvNAqeJ5AsHRSUZXSkS8tsYxUpHHu',
//     domain: 'dev-h0r0i70d48kv3b68.us.auth0.com', // e.g., you.auth0.com
//     audience: 'https://dev-h0r0i70d48kv3b68.us.auth0.com/api/v2/', //'YOUR-AUTH0-API-IDENTIFIER',
//     auth0RedirectUri: 'http://localhost:4200/data-table', // URL to return to after auth0 login
//     auth0ReturnTo: 'http://localhost:4200', // URL to return to after auth0 logout
//     scope: 'openid profile',
//   },
// };

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
