// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { PayPalEnvironment } from 'ngx-paypal';
export const environment = {
  production: false,
  /*apiURL: 'http://localhost:8000',
  webAuth: {
    domain: 'allgiftedllc.au.auth0.com',
    clientID: 'bs3jSKz2Ewrye8dD2qRVrD0Tra2tOqHC',
    audience: 'https://allgiftedllc.au.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/home',
    theme: {
      logo: "http://school.all-gifted.com/pluginfile.php/1/theme_lambda/logo/1472088488/newlogo.png"
    }
  },
  */
  //apiURL: 'http://devapi.pamelalim.me',
  apiURL: 'https://mathapi.pamelalim.me',
  // webAuth: {
  //   clientID: 'eVJv6UFM9GVdukBWiURczRCxmb6iaUYG',
  //   domain: 'pamelalim.auth0.com',
  //   audience: 'https://pamelalim.auth0.com/userinfo',
  //   redirectUri: 'http://localhost:4200/home',
  //   theme: {
  //     logo: "http://school.all-gifted.com/pluginfile.php/1/theme_lambda/logo/1472088488/newlogo.png"
  //   }
  // },
  webAuth: {
    clientID: 'bs3jSKz2Ewrye8dD2qRVrD0Tra2tOqHC',
    domain: 'allgiftedllc.au.auth0.com',
    audience: 'https://allgiftedllc.au.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/home',//http://math.all-gifted.com/home
    theme: {
      logo: "http://school.all-gifted.com/pluginfile.php/1/theme_lambda/logo/1472088488/newlogo.png"
    }
  },
  payPal: {
    payPalEnvironment: PayPalEnvironment.Sandbox,
    productionKey: "AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R",
    sandboxKey: "AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R",
    postEnrollmentUrl: 'http://devapi.pamelalim.me/enrolments'
  }
};
