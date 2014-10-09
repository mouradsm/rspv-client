'use strict';



    // Criando o módulo principal do nosso componente e injetando suas dependencias
    angular.module('rspv', [
        'ngResource',
        'ngRoute',
        'rspv.controllers',
        'flash.factory',
        'MessageCenterModule'
        ])
        .config(function ($routeProvider) {
            $routeProvider
                .when('/', {
                    templateUrl: 'modules/client/views/main.html',
                    controller: 'ConvidadoController'
                })
                .when('/report', {
                    templateUrl: 'modules/client/views/report.html',
                    controller: 'ReportController'
                })
                .otherwise({
                    redirectTo: '/'
                });
        });


