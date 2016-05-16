// Framework

var _framework = _framework || (function () {

  'use strict';

  // Private space

  var _components = [];
  var _instances = [];

  var _setup = function () {
    for (var i = 0; i < _components.length; ++i) {
      _bind(_components[i]);
    }
  };

  var _bind = function (component) {
    var elements = document.getElementsByTagName(component.tag);
    for (var i = 0; i < elements.length; ++i) {
      var instance = new component.constructor(elements[i]);
      _instances.push(instance);
    }
  };

  // Public space

  return {

    // Public space to hold user defined schemas

    schemas: {},

    // Register a component

    register: function (component) {
      _components.push(component);
    },

    // Bootstrap the application

    bootstrap: function () {
      _setup();
    }
  };
})();
