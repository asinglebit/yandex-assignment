// Framework component (button)

(function(){

  'use strict'

  // Check framework availability

  if (typeof _framework == "undefined") {
    console.log("_button.js : No '_framework' module found! Be sure to load it up first!");
    return;
  }
  
  var _bind_schema = function(instance){
    instance.schema = _framework.schemas[instance.schema_name];
  }

  var _generate_elements = function(instance){

    // Generate elements

    instance.elements.button = document.createElement("BUTTON");
    instance.elements.label = document.createTextNode(instance.schema.data.label);
    instance.elements.button.appendChild(instance.elements.label);
    instance.elements.root.appendChild(instance.elements.button);

    // Add classes

    instance.elements.button.className += instance.schema.classes.toString().split(",").join(" ");
  }

  var button = {

    // Component's tag

    tag : "framework-button",

    // Methods

    methods : {

      // Initialize component

      initialize : function(root){

        var instance = {
          schema_name : "",
          elements : {
            root : {}
          }
        };

        // Get root element

        instance.elements.root = root;

        // Get schema name

        instance.schema_name = instance.elements.root.getAttribute("framework-schema");
        if (!(_framework.schemas.hasOwnProperty(instance.schema_name))) {
          console.log("No schema defined for '" + instance.schema_name + "' !");
          return false;
        }

        // Bind schema

        _bind_schema(instance);
        _generate_elements(instance);

        // Bind methods

        instance.elements.button.addEventListener("click", instance.schema.methods.click);

        return instance;
      }
    }
  }

  _framework.register(button);

})();
