
      // APP
      var app = angular.module("app", [
        "ngResource", //Make calls to APIs
        "ngAnimate", //Play with animation
        "ui.router", //Play with routes
        "ngAria",
        "ngMessages", //Show users your messages(form validation, for example)
        "ngMaterial", // Create awsome interfaces
        'chat'
      ]);

      // Global constants
      app.factory("Globals", function() {
        //  Add your global constants here.
        let constants = {
          apiUrl: "https://mysite"
        };

        for (key in constants) {
          Object.freeze(constants, key);
        }
        return constants;
      });

      // Routes
      app.config([
        "$stateProvider",
        '$locationProvider',
        function($stateProvider, $locationProvider) {
          $stateProvider
            .state('home', {
              url: '/',
              redirectTo: 'chat'
            })
            .state("login", {
              url: "/login",
              component: "login"
            })
            .state("about", {
              url: "/about",
              component: "about"
            });
        }
      ]);

      // Components go here
      (function(app) {
        app.component("home", {
          template: "<h1>Login</h1><p>Hello, {{ $ctrl.user.name }} !</p>",
          controller: function() {
            this.user = { name: "Home component here" };
          }
        });

        app.component("login", {
          template: "<h1>Login</h1><p>Hello, {{ $ctrl.user.name }} !</p>",
          controller: function() {
            this.user = { name: "Login" };
          }
        });

        app.component("about", {
          template: "<h1>About</h1><p>Hello, {{ $ctrl.user.name }} !</p>",
          controller: [
            "Globals",
            function(Globals) {
              Globals.apiUrl = "This text should not be seen!";
              this.user = { name: " About " + Globals.apiUrl };
            }
          ]
        });
      })(app);
