(function(){

'use strict';

/**
 * @name pokemonService
 * @description service for API requests
 **/

angular.module('pokedexApp')
	   .service('pokemonService', function ($resource) {

		return $resource('http://localhost:4730/pokemons',{},{ 
					'query':  {
							method:'GET', 
							isArray:true
					},
					'getPokemonTypes':  {
							url: 'http://localhost:4730/types',
							method:'GET', 
							isArray:true
					},
					'getPokemonSkills':  {
							url: 'http://localhost:4730/skills',
							method:'GET', 
							isArray:true
					}
				});
		});
	   
})();
