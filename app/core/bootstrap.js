require('./vendor')();

angular.module('SKTV', [
  'ngSanitize',
  'ngTouch',
  'ngRaven',
  'ngStorage',
  'ui.router',
  'ui.bootstrap',
  'ui.select',
  "oitozero.ngSweetAlert",
  'angular-carousel',
  'angucomplete-alt',
  require('./config').name,
  require('./controllers').name,
  require('./directives').name,
  require('./services').name,
  require('./filters').name,
])

.constant('SETTINGS', {
  development: (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") ? true : false,
  mapKey: 'AIzaSyDKKCkwKT3rrJB0FsDQJKuGjuweKe4cdN0',
  apiURL: (window.location.hostname === "localhost") ? 'http://localhost:8080/api' : "https://sktv-api.herokuapp.com/api",
  instagramEmbed: 'https://api.instagram.com/oembed?url=http://instagr.am/p/'
})

.run(['$rootScope', function ($rootScope) {
  $rootScope.$on('$stateChangeSuccess', function() {
    document.body.scrollTop = document.documentElement.scrollTop = 0;
  });
}])

.config(function($sceDelegateProvider, $compileProvider) {

  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|mailto|tel|herp|derp):/);

  $sceDelegateProvider.resourceUrlWhitelist([
    // Allow same origin resource loads.
    'self',
    // Allow loading from our assets domain.  Notice the difference between * and **.
    '*://www.youtube.com/**',
    '*://www.google.com/**'
  ]);

})
;

angular.element(document).ready(() => {
  angular.bootstrap(document, ['SKTV'], {});
});

Raven
  .config('https://59d94241663643b3a86a11fad409d3a9@sentry.io/707403')
  .addPlugin(Raven.Plugins.Angular)
  .install();


