(function () {
    var app = angular.module('rspv', []);


    app.controller('OrderFormController', function ($scope, $http) {

        $scope.Convidado = [];
        $scope.convidadosProcessados = [];
        $scope.confirmados = [];

        $scope.toggleActive = function (s) {
            s.active = !s.active;
        };

        // Método útil para calcular o preço total
        $scope.total = function () {
            var total = 0;

            // Uso o método auxiliar do Angular 'forEach'
            // para iterar o array services

            angular.forEach($scope.convidadosProcessados, function (s) {

                if (s.active) {
                    if($.inArray(s.nome,$scope.confirmados) == -1){
                        $scope.confirmados.unshift(s.nome);
                    }
                    total += 1;
                }else{
                    if($.inArray(s.nome,$scope.confirmados) != -1){
                        $scope.confirmados.pop(s.nome);
                    }
                }
            });
            return total;
        };

        $scope.processaConvidados = function (filtro) {
            // filtro = encodeURIComponent(filtro);

            if (filtro == undefined) {
                alert('Digite o Nome conforme está no Convite');
            }

            $http({
                method: 'GET',
                url: 'http://hidden-refuge-3353.herokuapp.com/api/convidados/'
                //url: 'http://localhost:3000/api/convidado/' + filtro
            }).success(function (result) {
                console.log(result);
                if (result.length > 0) {
                    $scope.Convidado = result[0];

                    var tag = result[0].Tag;

                    var convidadosTag = tag.split(' e ');

                    if (convidadosTag.slice(-1) != 'Família') {
                        angular.forEach(convidadosTag, function (o) {
                            result[0].Acompanhantes.unshift({ nome: o});
                        });

                        $scope.convidadosProcessados = result[0].Acompanhantes;
                    } else {
                        convidadosTag.pop();
                        console.log(result[0].Acompanhantes);
                        var acompanhantes = result[0].Acompanhantes

                        //sanitariza o que já tinha antes

                        result[0].Acompanhantes = [];

                        angular.forEach(acompanhantes, function (o) {
                            result[0].Acompanhantes.unshift({ nome: o});
                        })

                        angular.forEach(convidadosTag, function (o) {
                            result[0].Acompanhantes.unshift({ nome: o});
                        });
                        $scope.convidadosProcessados = result[0].Acompanhantes;
                    }


                    $scope.filtro = undefined;
                }else{
                    alert('Nome inválido! Digite exatamente como está no convite. Ex: Fulano e Família')
                }
            });
        };

        $scope.save = function(){

            console.log($scope.confirmados);




        };


    });

})();

