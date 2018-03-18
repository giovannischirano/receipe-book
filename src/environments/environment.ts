// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAEfN4C3vJoORMNXLEM-fzNeFaaBnBq8oo",
    authDomain: "giovanni-ngrecipes.firebaseapp.com",
    databaseURL: "https://giovanni-ngrecipes.firebaseio.com",
    projectId: "giovanni-ngrecipes",
  }
};
