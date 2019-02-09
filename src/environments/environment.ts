// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
import { PayPalEnvironment } from 'ngx-paypal';
export const environment = {
  production: false,
  apiURL: 'http://localhost',
  webAuth: {
    clientID: 'bs3jSKz2Ewrye8dD2qRVrD0Tra2tOqHC',
    domain: 'allgiftedllc.au.auth0.com',
    audience: 'https://allgiftedllc.au.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/',
    theme: {
      logo: "http://school.all-gifted.com/pluginfile.php/1/theme_lambda/logo/1472088488/newlogo.png"
    }
  },
  payPal: {
    payPalEnvironment: PayPalEnvironment.Sandbox,
    productionKey: "AcWwalMgPfGKd-sT_fHGPOf6hAnLc_i8LfhuWlGSl29pd4tR3FWi66FGJt_dI6LPcPvby0yQ1JP4UTK0",
    sandboxKey: "AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R",
    postEnrollmentUrl: 'http://mathapi.pamelalim.me/enrolments'
  } 
};