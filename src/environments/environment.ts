// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  isServer: false,
  firebase: {
    apiKey: "AIzaSyA59tYpK8vsvHhd2v_1446_OGlcreNP52o",
    authDomain: "africa-smb.firebaseapp.com",
    databaseURL: "https://africa-smb.firebaseio.com",
    projectId: "africa-smb",
    storageBucket: "africa-smb.appspot.com",
    messagingSenderId: "849601472659",
    appId: "1:849601472659:web:4be93f2a1fea731eac0566",
    measurementId: "G-PNQK1E4T40"
  },
  
  // for prerender
  host: 'http://localhost:4000'
};
