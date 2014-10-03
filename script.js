'use strict';

(function () {
    var app = angular.module('rspv', []);

    var currentMessage = "";
    var classe         = "";

    app.factory('flash', function(){

        return {
            setClass: function(novaClasse){
                 classe = novaClasse;
            },
            getClass: function(){
                return classe;
            },
            setMessage: function(message){
                currentMessage = message;
            },
            getMessage: function(){
                return currentMessage;
            }
        }
    });

    app.controller('ConvidadoController', function ($scope, $http, flash) {

        $scope.flash        = flash;
        $scope.convidados   = [];
        $scope.confirmados  = [];

        function processaConvidados (convidados){
            var objConvidado = convidados[0];

            if($.isEmptyObject(objConvidado)){
                flash.setMessage('Convidado inválido! Verifique e escreva corretamente.')
                flash.setClass('alert alert-danger');

                return false;
            }

            if(objConvidado.status == '1'){
                flash.setMessage('Convidado já confirmado!');
                flash.setClass('alert alert-info');

                return false;
            }

            var tag = processaTag(objConvidado.Tag)

            var lastItem = tag.slice(-1);

            if((lastItem == 'Família') || (lastItem == 'Esposo')  ){
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

        function processaTag(tag){
            var arrTag = tag.split(' e ');
            return arrTag;
        }

        $scope.total = function(){
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
                flash.setMessage('Convidado confirmado! Obrigado!');
                flash.setClass('alert alert-success');
            });

            $scope.convidados   = [];
            $scope.confirmados  = [];
            $scope.tag          = [];

        };

        $scope.getConvidado = function(tag){
            if(typeof tag == 'string'){
                
                var url     = 'http://hidden-refuge-3353.herokuapp.com/api/convidado/' + tag;
                var method  = 'GET';

                $http({
                    url     : url,
                    method  : method
                }).
                success(function(data){
                    $scope.convidados = processaConvidados(data);
                }).
                error(function(err){
                    console.log('Erro: ',err);
                })
            }
        }
    });
})();

