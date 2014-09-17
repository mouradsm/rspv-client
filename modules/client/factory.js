(function () {

    angular.module('flash.factory', []);

    var currentMessage, classe = "";

    // Criando o módulo para o factory
    angular.module('flash.factory')
    .factory('flash', function () {

        return {
            setClass: function (novaClasse) {
                 classe = novaClasse;
            },
            getClass: function () {
                return classe;
            },
            setMessage: function (message) {
                currentMessage = message;
            },
            getMessage: function () {
                return currentMessage;
            }
        }
    });
}());