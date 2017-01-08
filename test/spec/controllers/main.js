'use strict';

describe('Controller: MainCtrl', function () {

  // load the controller's module
  beforeEach(module('pokedexApp'));

  var MainCtrl,
      scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl as vm', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  //Unit 1 - Set the list of pokemon
  it('Should set the list of pokemon to zero', function() { 
      expect(MainCtrl.pokemons.length).toBe(0); //pass
  });

  //Unit 2 - a function used to get unique skills of the selected pokemon
  it('Should get unique value in an array', function() { 
      var array = [1, 2, 3, 1, 2]; //sample array with duplicate values 
      expect(MainCtrl.getUniqueSkills(array).length).toBe(3); 
  });

  //Unit 3 - default search criteria
  it('Should set the search criteria by ename', function() { 
      expect(MainCtrl.searchBy).toBe('ename'); 
  });

});
