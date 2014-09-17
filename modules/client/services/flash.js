(function () {

    var currentMessage, classe = "";

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
});