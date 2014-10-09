(function () {

    // Criando o módulo de controllers
    angular.module('rspv.controller.convidado', []);

    angular.module('rspv.controller.convidado')
        .controller('ConvidadoController', ConvidadoController);

    // Injetando as dependencias
    ConvidadoController.$inject = ['$scope', '$http', 'flash', 'messageCenterService'];

    // Criando a função do controller
    function ConvidadoController($scope, $http, flash, messageCenterService) {

        $scope.mcMessages = messageCenterService.mcMessages

        $scope.flash = flash;
        $scope.convidados = [];
        $scope.confirmados = [];

        function processaConvidados(convidados) {
            $scope.convidados = [];
            var objConvidado = convidados[0];

            if ($.isEmptyObject(objConvidado)) {

                messageCenterService.add('danger',
                                         'Convidado inválido! Verifique e escreva corretamente.',
                                         { timeout: 3000 })
                return false;
            }

            if (objConvidado.status == '1') {

                messageCenterService.add('info',
                    'Convidado já confirmado',
                    { timeout: 3000 });

                return false;
            }

            var tag = processaTag(objConvidado.Tag)

            var lastItem = tag.slice(-1);

            if ((lastItem == 'Família') || (lastItem == 'Esposo')) {
                tag.pop();
            }

            var auxAcompanhantes = objConvidado.Acompanhantes;

            objConvidado.Acompanhantes = [];

            angular.forEach(auxAcompanhantes, function (o) {
                objConvidado.Acompanhantes.unshift({ nome: o});
            })

            angular.forEach(tag, function (o) {
                objConvidado.Acompanhantes.unshift({ nome: o});
            });

            return objConvidado.Acompanhantes;
        }

        function processaTag(tag) {
            var arrTag = tag.split(' e ');
            return arrTag;
        }

        $scope.total = function () {
            var total = 0;

            // Uso o método auxiliar do Angular 'forEach'
            // para iterar o array services

            angular.forEach($scope.convidados, function (s) {

                if (s.active) {
                    if ($.inArray(s.nome, $scope.confirmados) == -1) {
                        $scope.confirmados.unshift(s.nome);
                    }
                    total += 1;
                } else {
                    if ($.inArray(s.nome, $scope.confirmados) != -1) {
                        $scope.confirmados.pop(s.nome);
                    }
                }
            });

            return total;
        }
        $scope.toggleActive = function (s) {
            s.active = !s.active;
        };

        $scope.save = function () {

            var tag = $scope.tag;
            var confirmados = $scope.confirmados;

            $http({
                method: 'PUT',
                url: 'http://hidden-refuge-3353.herokuapp.com/api/convidado/' + tag + '/' + confirmados
            }).success(function () {
                messageCenterService.add('success',
                                         'Convidado confirmado! Obrigado!',
                                         {timeout: 3000});
            });

            $scope.convidados = [];
            $scope.confirmados = [];
            $scope.tag = [];

        };

        $scope.getConvidado = function (tag) {
            if (typeof tag == 'string') {

                var url = 'http://hidden-refuge-3353.herokuapp.com/api/convidado/' + tag;
                var method = 'GET';

                $http({
                    url: url,
                    method: method
                }).
                    success(function (data) {
                        $scope.convidados = processaConvidados(data);
                    }).
                    error(function (err) {
                        console.log('Erro: ', err);
                    })
            }
        }
    }
}());