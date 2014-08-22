(function () {
    'use strict';

    angular
        .module('app')
        .config(config);

    config.$inject = ['$routeProvider'];

    function config($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'app/partials/views/index.view.html',
                controller: 'IndexController',
                controllerAs: 'indexController'
            }).
            otherwise({
                redirectTo: '/'
            });
    }

})();