'use strict';
(function () {
    var app = angular.module('rspv', []);



    app.controller('ConvidadoController', function ($scope, $http) {

        $scope.convidados = [];
        $scope.confirmados = [];

        function processaConvidados (convidados){
            var objConvidado = convidados[0];

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
        };

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

        $scope.getConvidado = function(tag){
            if(typeof tag == 'string'){
                
                var url     = 'http://hidden-refuge-3353.herokuapp.com/api//convidado/' + tag;
                var method  = 'GET';

                $http({
                    url     : url,
                    method  : method
                }).
                success(function(data){
                    //console.log('Data: ',data);
                    $scope.convidados = processaConvidados(data);
                }).
                error(function(err){
                    console.log('Erro: ',err);
                })
            }
        }
    });





/*        $scope.$on('LOAD', function(){$scope.loading=true});
        $scope.$on('UNLOAD', function(){$scope.loading=false});

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
        };

        $scope.processaConvidados = function (filtro) {
            // filtro = encodeURIComponent(filtro);

            if (filtro == undefined) {
                alert('Digite o Nome conforme está no Convite');
            }

            $http({
                method: 'GET',
                url: 'http://hidden-refuge-3353.herokuapp.com/api//convidado/' + filtro
                //url: 'http://localhost:3000/api/convidado/' + filtro
            }).success(function (result) {
                $scope.$emit('LOAD');
                if (result[0].status == 0) {
                if (result.length > 0) {
                    $scope.Convidado = result[0];
                    console.log(result[0]);


                        var tag = result[0].Tag;

                        var convidadosTag = tag.split(' e ');

                        if (convidadosTag.slice(-1) != 'Família') {
                            angular.forEach(convidadosTag, function (o) {
                                result[0].Acompanhantes.unshift({ nome: o});
                            });

                            $scope.convidadosProcessados = result[0].Acompanhantes;
                        } else {
                            convidadosTag.pop();
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
                        $scope.$emit('UNLOAD');
                        $scope.filtro = undefined;
                        

                    } else {
                        alert('Nome inválido! Digite exatamente como está no convite. Ex: Fulano e Família')
                    }
                }else{
                     alert('Convidado já confirmado!');
                }
            });
        };

        $scope.save = function () {

            var tag = $scope.Convidado.Tag;
            var confirmados = $scope.confirmados;

            $http({
                method: 'PUT',
                url: 'http://hidden-refuge-3353.herokuapp.com/api/convidado/' + tag + '/' + confirmados
                //url: 'http://localhost:5000/api/lista/'+id+'/'+email
            }).success(function (message) {
                alert('Confirmado com Sucesso!!');
            });

            console.log(confirmados);

            $scope.Convidado = [];
            $scope.convidadosProcessados = [];
            $scope.confirmados = [];

        };


    });*/

})();

