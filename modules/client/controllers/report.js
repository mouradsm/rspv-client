(function () {

    // Criando o módulo de controllers
    angular.module('rspv.controller.report', []);

    angular.module('rspv.controller.report')
        .controller('ReportController', ReportController);

    ReportController.$inject = ['$scope', '$http'];

    function ReportController($scope, $http){
        $scope.value = 1;
        $scope.convidados = [];

        $scope.massa = [];


        $scope.$watch('value', function(value) {

            $scope.processaConvidadosReport($scope.massa, value);

        });


        $scope.processaConvidadosReport = function(convidados, option){
            console.log(option);
            $scope.convidados = [];
            convidados.forEach(function(data){
                if(data.status == option){
                    $scope.convidados.push(data)
                }
            })
        }

        $scope.getConvidados = function () {

                var url = 'http://hidden-refuge-3353.herokuapp.com/api/convidados/';
                var method = 'GET';

                $http({
                    url: url,
                    method: method
                }).
                    success(function (data) {
                        $scope.massa = data;
                        $scope.processaConvidadosReport(data,1);
                    }).
                    error(function (err) {
                        console.log('Erro: ', err);
                    })
        }();
    };

})();