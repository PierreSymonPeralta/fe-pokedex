'use strict';

/**
 * @ngdoc function
 * @name pokedexApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the pokedexApp
 */
angular.module('pokedexApp').controller('MainCtrl', MainCtrl);

    MainCtrl.$inject = ['pokemonService'];

    function MainCtrl(pokemonService) {
        var vm = this;
        
        //variables
        vm.searchBy = 'ename';
        vm.searchValue = '';
        vm.reverse = false;
        vm.selectedPokemon = {};
        vm.selectedPokemonSkills = [];
        vm.orderByValue = '';

        //functions
        vm.activate   =   activate;
        vm.getPokemonType = getPokemonType;
        vm.getPokemonSkills = getPokemonSkills;
        vm.searchPokemon = searchPokemon;
        vm.clearSearchValue = clearSearchValue;
        vm.setOrderBy = setOrderBy;
        vm.showPokemonDetails = showPokemonDetails;

        activate();

       /**
       * @name activate
       * @description : on load function
       **/
        function activate() {
            pokemonService.getPokemonTypes().$promise.then(onSuccessTypes, onErrorTypes); 
            pokemonService.getPokemonSkills().$promise.then(onSuccessSkills, onErrorSkills); 
            pokemonService.query().$promise.then(onSuccessPokemons, onErrorPokemons); 
        }
        function onSuccessPokemons(data) {
            vm.pokemons = data;

            vm.getPokemonType();
        }
        function onErrorPokemons(error) {
            
        }
        function onSuccessTypes(data) {
            vm.types = data;
            vm.hasError = false;
        }
        function onErrorTypes(error) {
            
        }
        function onSuccessSkills(data) {
            vm.skills = data;
            
        }
        function onErrorSkills(error) {
            
        }


        /**
        * @name getPokemonType
        * @description : after getting all the pokemons, get each ename of types
        **/
        function getPokemonType() {
            var numberOfPokemons = vm.pokemons.length;
            var numberOfTypes = vm.types.length;

            for (var i = 0; i < numberOfPokemons; i++) {
                var numberOfTypeOfThisPokemon = vm.pokemons[i].type.length;
                var enameType = [];
                for (var j = 0; j < numberOfTypeOfThisPokemon; j++) {
                    for (var k = 0; k < numberOfTypes; k++) {
                        if (vm.types[k].cname == vm.pokemons[i].type[j]) {
                            enameType.push(vm.types[k].ename);
                        }
                    }
                }
                vm.pokemons[i].enameType = enameType;
            }
        }

        /**
        * @name getPokemonSkills
        * @description : get the details of each skills of the selected pokemon
        **/
        function getPokemonSkills() {
            var skills = {};
            var currentSkillsId = [];
            var levelupSkills = [];

            if (vm.selectedPokemon.skills.level_up != undefined) {
                currentSkillsId = getUniqueSkills(vm.selectedPokemon.skills.level_up);
                var numberOfPokemonSkills = currentSkillsId.length;
                var numberOfSkills = vm.skills.length;
                for (var i = 0; i < numberOfPokemonSkills; i++) {
                    for (var j = 0; j < numberOfSkills; j++) {
                        if (currentSkillsId[i] == vm.skills[j].id) {
                            levelupSkills.push(vm.skills[j]);
                        }
                    };
                }
            }
            vm.selectedPokemonSkills = levelupSkills;
        }

        /**
        * @name getUniqueSkills
        * @description : get the final list of skills of the selected pokemon
        **/
        function getUniqueSkills(arr) {
                var result = [];
                for (var i = 0; i < arr.length; i++) {
                    if (result.indexOf(arr[i]) == -1) {
                        result.push(arr[i]);
                    }
                }
                return result;
        }

        /**
        * @name searchPokemon
        * @description : filter the list based on the input criteria
        **/
        function searchPokemon(item) {
            var query = angular.lowercase(vm.searchValue);
            if (vm.searchBy == 'ename') {
                return (angular.lowercase(item.ename).indexOf(query || '') !== -1);
            } else if (vm.searchBy == 'id') {
                return (angular.lowercase(item.id).indexOf(query || '') !== -1);
            } else if (vm.searchBy == 'type') {
                var hasMatch = false;
                for (var i = 0; i < item.enameType.length; i++) {
                    if (angular.lowercase(item.enameType[i]).indexOf(query || '') !== -1) {
                        hasMatch = true;
                    }
                }
                return hasMatch;
            }
        }

        /**
        * @name clearSearchValue
        * @description : clear the search value used in filter
        **/
        function clearSearchValue() {
            vm.searchValue = '';
            vm.reverse = false;
            vm.orderByValue = '';
        }

        /**
        * @name clearSelectedPkemon
        * @description : clear the model of the selected pokemon
        **/
        function clearSelectedPkemon() {
            vm.selectedPokemon = {};
            vm.selectedPokemonSkills = [];
        }

        /**
        * @name setOrderBy
        * @description : set the value for sorting
        **/
        function setOrderBy(value) {
            vm.reverse = (vm.orderByValue == value) ? !vm.reverse : false;
            vm.orderByValue = value;
        }

        /**
        * @name showPokemonDetails
        * @description : get the model of the selected pokemon
        **/
        function showPokemonDetails(pokemon) {
            clearSelectedPkemon();
            vm.selectedPokemon = Object.assign({}, pokemon);
            vm.getPokemonSkills();
        }


    
  }
