(function () {

    // Criando o módulo de controllers
    angular.module('rspv.controller.report', []);

    angular.module('rspv.controller.report')
        .controller('ReportController', ReportController);

    ReportController.$inject = ['$scope', '$http'];

    function ReportController($scope, $http){





        $scope.convidados = [];


        $scope.processaConvidadosReport = function(convidados){

            var confirmados = [];



        }

        $scope.getConvidados = function () {

                var url = 'http://hidden-refuge-3353.herokuapp.com/api/convidados/';
                var method = 'GET';

                $http({
                    url: url,
                    method: method
                }).
                    success(function (data) {
                        $scope.convidados = data;
                    }).
                    error(function (err) {
                        console.log('Erro: ', err);
                    })
        }();
    };

})();