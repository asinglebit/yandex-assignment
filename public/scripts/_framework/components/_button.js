// Framework component (button)

(function(){

  'use strict'

  // Check framework availability

  if (typeof _framework == "undefined") {
    console.log("_button.js : No '_framework' module found! Be sure to load it up first!");
    return;
  }

  var _instance = {
    schema_name : "",
    elements : {
      root : {}
    }
  };

  var _bind_schema = function(){
    _instance.schema = _framework.schemas[_instance.schema_name];
  }

  var _generate_elements = function(){

    // Generate elements

    _instance.elements.button = document.createElement("BUTTON");
    _instance.elements.label = document.createTextNode(_instance.schema.data.label);
    _instance.elements.button.appendChild(_instance.elements.label);
    _instance.elements.root.appendChild(_instance.elements.button);

    // Add classes

    _instance.elements.button.className += _instance.schema.classes.toString().split(",").join(" ");
  }

  var button = {

    // Component's tag

    tag : "framework-button",

    // Methods

    methods : {

      // Initialize component

      initialize : function(root){

        // Get root element

        _instance.elements.root = root;

        // Get schema name

        _instance.schema_name = _instance.elements.root.getAttribute("framework-schema");
        if (!(_framework.schemas.hasOwnProperty(_instance.schema_name))) {
          console.log("No schema defined for '" + _instance.schema_name + "' !");
          return false;
        }

        // Bind schema

        _bind_schema();
        _generate_elements();

        // Bind methods

        _instance.elements.button.addEventListener("click", _instance.schema.methods.click);

        return _instance;
      }
    }
  }

  _framework.register(button);

})();
