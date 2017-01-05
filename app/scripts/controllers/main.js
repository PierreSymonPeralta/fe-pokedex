'use strict';

/**
 * @ngdoc function
 * @name pokedexApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pokedexApp
 */
angular.module('pokedexApp').controller('MainCtrl', MainCtrl);

    function MainCtrl(pokemonService, $timeout) {
        var vm = this;
        //variables
        vm.hasError   =   false;
        vm.filterBy   =   {};

        //functions
        vm.activate   =   activate;
        vm.getData    =   getData;
        vm.clearData  =   clearData;
        vm.setFilter  =   setFilter;

        activate();


        /**
       * @ngdoc function
       * @name pokedexApp.controller:MainCtrl
       * @description
       **/
        function activate(){
          pokemonService.query().$promise.then(onSuccessPokemons, onErrorPokemons); 
          pokemonService.getPokemonTypes().$promise.then(onSuccessTypes, onErrorTypes); 
          pokemonService.getPokemonSkills().$promise.then(onSuccessSkills, onErrorSkills); 
        }
        function onSuccessPokemons(data){
          vm.pokemons = data;
          vm.hasError = false;
          // console.log('POKEMONS!!!');
          //console.log(vm.pokemons);
        }
        function onErrorPokemons(error){
          vm.hasError = true;
        }
        function onSuccessTypes(data){
          vm.types = data;
          vm.hasError = false;
          // console.log('TYPES!!!');
          // console.log(vm.types);
        }
        function onErrorTypes(error){
          vm.hasError = true;
        }
        function onSuccessSkills(data){
          vm.skills = data;
          vm.hasError = false;
          // console.log('SKILLS!!!');
          // console.log(vm.skills);
        }
        function onErrorSkills(error){
          vm.hasError = true;
        }

        /**
       * @ngdoc function
       * @name pokedexApp.controller:MainCtrl
       * @description
       **/
       function getData(){
        vm.pokemons = [];
          $timeout(function(){
            pokemonService.query().$promise.then(onSuccess, onError); 
          },600);
       }

      /**
       * @ngdoc function
       * @name pokedexApp.controller:MainCtrl
       * @description
       **/
       function clearData(){
        vm.pokemons.splice(0,1);
       }

       /**
       * @ngdoc function
       * @name pokedexApp.controller:MainCtrl
       * @description
       **/
       function setFilter(type){
        vm.filterBy.type = type;
       }
    
  }
