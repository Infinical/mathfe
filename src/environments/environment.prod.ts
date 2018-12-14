import { PayPalEnvironment } from 'ngx-paypal';
export const environment = {
  production: true,
  apiURL: 'http://devapi.pamelalim.me',
  webAuth: {
    clientID: 'eVJv6UFM9GVdukBWiURczRCxmb6iaUYG',
    domain: 'pamelalim.auth0.com',
    audience: 'https://pamelalim.auth0.com/userinfo',
    redirectUri: 'http://localhost:4200/home',
    theme: {
      logo: "http://school.all-gifted.com/pluginfile.php/1/theme_lambda/logo/1472088488/newlogo.png"
    }
  },
  payPal: {
    payPalEnvironment: PayPalEnvironment.Production,
    productionKey: "AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R",
    sandboxKey: "AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R",
    postEnrollmentUrl: 'http://devapi.pamelalim.me/enrolments'
  }
};
