# Angular Starter
This starter project has the following features:

- Built using Angular 7 (see below for standard Angular info)
- Includes Bootstrap and its dependencies via CDN, plus the **Cerulean** theme from https://bootswatch.com
- Includes OIDC authentication via a demo isntance of IdentityServer4 at https://demo.identityserver.io 
- Demonstrates "deep linking" -- i.e. go to ``/some-random-page`` as your first target and you will end up there after logging in.  Otherwise you end up at ``/home``.
- Sets page title as new components loaded
- Demonstrates authenticated API calls - and error handles them
- Includes logout and silent token renewal functionality
- Includes and "alert service" for pages to set alerts when wanted without needing new markup
- Includes ``Core`` and ``Shared`` modules as recommended by Angular style guide
- Uses Lazy Loading for Api Caller, Some-Random-Page, and Logout features

## To try out and use the project
- Run ``npm install`` from the project directory
- Run ``ng serve`` from the project directory
- Use a web browser and browse to http://localhost:4200

NOTE: The config for the Unified Login integration is in the ``shared\auth.service.ts`` file (the bottom).

Copy any/all of the files to get started with your own Angular project.

# Foundations
## Angular CLI
This application was built using the [Angular CLI](https://github.com/angular/angular-cli/wiki).  As such, `ng serve` is used to start the dev webserver, and other such commands are available that make development easier (adding npm packages, generating components or services or pipes, etc).  See the [documentation ](https://github.com/angular/angular-cli/wiki) for information about the various available commands.

## Boostrap
Bootstrap is included via CDN on the [`src/index.html`](./src/index.html) page both in the form of CSS files and the required JS files.  

## OIDC-Client
[`oidc-client` is a JavaScript library](https://github.com/IdentityModel/oidc-client-js/wiki) to facilitate implicit flow authentication with an OpenID Connect / OAuth2 security service, which is what the Unified Platform provides.

# Authentication
Authentication services are provided by `src/shared/auth.service.ts`, which puts a light wrapper on top of the `oidc-client` library.  The configuration is at the bottom of that file, and all values are fairly application-specific, and one value is **environment** specific (see Environments/Configuration below for more info).

## Sign In (with Deep Linking)
All pages in the application require an authenticated user, so the authentication check is during the load of the `app.component` code.

If the user is not authenticated, it will initiate the authentication process (via the `startAuthentication` method).  Before it does this it will check to see which URL the user was actually trying to access - if it's not the "home" page, then the target path is stored in HTML 5 session storage before the authentication process starts.

The authentication process redirects the user to the OpenID Connect / OAuth2 security token server.  Once the user completes the authentication process, they are sent back to the `auth-callback` component (as defined in the auth service).

The `auth-callback` component completes the sign in process and then checks session storage to see where the user should end up.

## Sign Out
Sign out is accomplished by the `logout` component.  For stopping impersonation some special logic is in place within this component (see below for more info).


# API calls
Authenticated, error handled API calls are made very simple.  Most can look like this:

    public getTodos() {    
        let apiUrl = environment.backendApiRoot + "/todos";   
        return this.http.get(apiUrl);
    }

The above call actually includes both a bearer token for authentication and error handling on the back end of the call, even though there is no code surrounding the call to do this.  The is accomplished via two `HTTP_INTERCEPTORS`.

## Auth Interceptor
This is the `src/shared/auth.interceptor.ts` and it just adds the `access_token` obtained during either the login process or the Silent Renew process (see below) to the HTTP headers for ALL outgoing requests.

If custom logic based on the hostname or something is needed, it should be applied here.

## Handling Interceptor
The `src/shared/handling.interceptor.ts` grabs the response from an API call and does some error handling with it.  If it wasn't successful, it adds console log entries that indicate the API call that was made and the log location for the API errors for easy access as shown in the animation below.

It additionally triggers a UI alert which is the red box you see on the page using the Alert Service described further below.

# Environments / Configuration
Any environment-specific configuration values should be contained in the appropriately-named environment.ts file in the `src/environments` folder.  API base addresses, the OIDC provider URL, and other such info would go into these files.

To add an environment, start by adding a new `environment.<newenvironment>.ts` file into the `src/environments` folder.  Copy the settings from `environment.ts` 
and make the appropriate updates.

Then in the `angular.json` file, under `configurations` copy the `production` configuration and make sure to update the `fileReplacements` property to use 
your new `environment.ts` file for the `with` value.  If you want to actually RUN against that new environment, you will have to add a new entry to the 
`serve` element.

# Adding Pages
To add a new page to the application, the workflow is generally something like this:

- Use `ng generate component <newpagename>` to scaffold out the folder, files, and add the component to the `app.module.ts` file
- If you have an API service you will be communicating with for just this new page, use `ng generate service <servicename>` to generate the service
- Add a route for the new page on the `app-routing.module.ts` file
- Make sure that your new page is included in the left nav by adding it to the `app.service.ts` code (or the eventual API that it calls)

Then you should be able to log in to the application and navigate to the page that you just created.  

The rest is the markup and logic that you want to build.  Sky's the limit. :)

## Remove the CSS if you don't need it
If you don't need custom css for your new page, remove the referrence to it from the `component.ts` file and then delete the css file itself.  Add back only if needed.  This reduces the "noise" in the project.

## Setting the Page Header
In the `ngOnInit` method, you probably want to set the page title.  To do that, add a private property in the constructor with the `NewPageService`.

Then within `ngOnInit` just set the page title as follows:

    this.newPgSvc.setNewPage("Whatever You Want in the Page Header");

# Alerts
A general global alert capability is included.  This can show an alert to the user in the various formats allowed within Bootstrap.

To set one, inject the `AlertService` into wherever you want to set it from, and then call the `createAlert` method like the example below:

    this.alertSvc.createAlert({alertClass: "alert-danger", alertMessage: "An error occurred during an API call!"});

The valid values for the `alertClass` are:
- `alert-primary`
- `alert-secondary`
- `alert-info`
- `alert-warning`
- `alert-success`
- `alert-danger`
- `alert-light`
- `alert-dark`

# Building and Running
Building is done with the `ng build` command.  To build for specific environments, use `ng build --configuration <configname>`.

Running is done via `ng serve`.  To run a specific environment config, use `ng serve --configuration <configname>`.
