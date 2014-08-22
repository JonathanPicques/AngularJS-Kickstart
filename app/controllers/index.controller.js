(function () {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['apiService'];

    function IndexController(apiService) {
        var vm = this;
        vm.data = null;

        apiService.getData()
            .success(function (data) {
                vm.data = data;
            });
    }

})();