// Framework component (table)

(function(){

  'use strict'

  // Check framework availability

  if (typeof _framework == "undefined") {
    console.log("_table.js : No _framework found! Be sure to load it up first!");
    return;
  }

  var table = {

    // Component's tag

    tag : "framework-table",

    // Methods

    methods : {

      // Initialize component

      initialize : function(root){

        // New instance

        var instance = {
          elements : {
            root : root
          }
        };

        // Get schema name

        var schema_name = instance.elements.root.getAttribute("framework-schema");
        if (!(_framework.schemas.hasOwnProperty(schema_name))) {
          console.log("No schema defined for '" + schema_name + "' !");
          return false;
        }

        // Bind schema

        instance.schema = _framework.schemas[schema_name];
        var numOfColumns = instance.schema.data.columns.length;

        // Generate elements

        instance.elements.table = document.createElement("table");

        // Table head

        instance.elements.table_head = document.createElement("thead");
        var row = document.createElement("tr");
        for (var i = 0; i < numOfColumns; i++) {
            var cell = document.createElement("th");
            var cellText = document.createTextNode(instance.schema.data.columns[i]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        instance.elements.table_head.appendChild(row);

        // Table body

        instance.elements.table_body = document.createElement("tbody");
        for (var j = 0; j < 3; j++) {
            var row = document.createElement("tr");
            for (var i = 0; i < numOfColumns; i++) {
              var cell = document.createElement("td");
              var cellText = document.createTextNode("[" + j + "], [" + i + "]");
              cell.appendChild(cellText);
              row.appendChild(cell);
            }
            instance.elements.table_body.appendChild(row);
        }
        instance.elements.table.appendChild(instance.elements.table_head);
        instance.elements.table.appendChild(instance.elements.table_body);
        instance.elements.root.appendChild(instance.elements.table);

        // Add classes

        instance.elements.table.className += instance.schema.classes.toString().split(",").join(" ");

        // Bind methods

        instance.elements.table.addEventListener("click", instance.schema.methods.click);

        // Bind event handlers

        _framework.event_emitter.on(instance.schema.events.load_data, function(){
          for (var j = 0; j < 3; j++) {
              var row = document.createElement("tr");
              for (var i = 0; i < numOfColumns; i++) {
                var cell = document.createElement("td");
                var cellText = document.createTextNode("[" + j + "], [" + i + "]");
                cell.appendChild(cellText);
                row.appendChild(cell);
              }
              instance.elements.table_body.appendChild(row);
          }
        })

        _framework.event_emitter.on(instance.schema.events.drop_data, function(){
          while (instance.elements.table_body.firstChild) {
              instance.elements.table_body.removeChild(instance.elements.table_body.firstChild);
          }
        })

        return instance;
      }
    }
  }

  _framework.register(table);

})();
