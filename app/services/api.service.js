(function () {
    'use strict';

    angular
        .module('app')
        .service('apiService', ApiService);

    ApiService.$inject = ['$http'];

    function ApiService($http) {
        var service = {
            getData: getData
        };

        function getData() {
            return $http.get('http://api.openweathermap.org/data/2.5/forecast?q=Paris');
        }

        return service;
    }

})();