// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { PayPalEnvironment } from 'ngx-paypal';
export const environment = {
  production: false,
<<<<<<< HEAD
  apiURL: 'http://localhost:8000',
=======
  apiURL: 'http://devapi.pamelalim.me',
>>>>>>> ecd4a03d1ea9e862bdab3389b153e66848738109
  webAuth: {
    clientID: 'eVJv6UFM9GVdukBWiURczRCxmb6iaUYG',
    domain: 'pamelalim.auth0.com',
    audience: 'https://pamelalim.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/home',
    theme: {
      logo: "http://school.all-gifted.com/pluginfile.php/1/core_admin/logo/0x150/1535925593/logo.png"
    }
  },
  payPal: {
    payPalEnvironment: PayPalEnvironment.Production,
    productionKey: "AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R",
    sandboxKey: "AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R",
    postEnrollmentUrl: 'http://devapi.pamelalim.me/enrolments'
  }
};