// Framework component (table)

(function(){

  'use strict'

  // Check framework availability

  if (typeof _framework == "undefined") {
    console.log("_table.js : No '_framework' module found! Be sure to load it up first!");
    return;
  };

  if (typeof _framework.http == "undefined") {
    console.log("_table.js : No 'http' module found! Be sure to load it up first!");
    return;
  };

  if (typeof _framework.filters == "undefined") {
    console.log("_table.js : No 'filters' module found! Be sure to load it up first!");
    return;
  };

  var _update_schema = function(instance){
    _framework.schemas[instance.schema_name] = instance.schema;
  };

  var _bind_schema = function(instance){
    instance.schema = _framework.schemas[instance.schema_name];
    instance.num_of_columns = instance.schema.data.appearance.length;
  };

  var _clear_elements = function(instance){
    if (instance.elements.table_body){
      while (instance.elements.table_body.firstChild) {
        instance.elements.table_body.removeChild(instance.elements.table_body.firstChild);
      }
    }
  };

  var _generate_elements = function(instance){

    // Table

    instance.elements.table = document.createElement("table");

    // Table head

    instance.elements.table_head = document.createElement("thead");
    var row = document.createElement("tr");
    for (var i = 0; i < instance.num_of_columns; i++) {
      var cell = document.createElement("th");
      var cellText = _framework.filters.title(instance.schema.data.appearance[i]);
      var span = document.createElement("span");
      span.appendChild(cellText);
      cell.appendChild(span);
      row.appendChild(cell);

      // IIFE to save the scope of the column name holding variable
      if (!instance.schema.data.sorting.disabled.toString().includes(instance.schema.data.appearance[i])){
        (function(){
          span.className = "link";
          var columnName = instance.schema.data.appearance[i];
          span.addEventListener("click", function(){
            instance.schema.data.sorting.column = columnName;
            instance.schema.data.sorting.ascending = !instance.schema.data.sorting.ascending;
            _update_schema(instance);
            instance.schema.methods.column_click(columnName);
          });
        })();
      }
    }
    instance.elements.table_head.appendChild(row);

    // Table body

    instance.elements.table_body = document.createElement("tbody");
    instance.elements.table.appendChild(instance.elements.table_head);
    instance.elements.table.appendChild(instance.elements.table_body);
    instance.elements.root.appendChild(instance.elements.table);

    // Add classes

    instance.elements.table.className += instance.schema.classes.toString().split(",").join(" ");
  }

  var _load_settings = function(data, instance){

    // Omitting success checks because of laziness
    data = data.data;

    instance.schema.data.appearance = data.appearance;
    instance.schema.data.sorting = data.sorting;
    _bind_schema(instance);
    _clear_elements(instance);
    _generate_elements(instance);
  }

  var _load_data = function(data, instance){

    // Omitting success checks because of laziness =)
    data = data.data.data;

    if (typeof data.docs != "undefined"){
      for (var j = 0; j < data.docs.length; j++) {
        var row = document.createElement("tr");
        for (var i = 0; i < instance.num_of_columns; i++) {
          var cell = document.createElement("td");
          var cellText = _framework.filters.value(data.docs[j][instance.schema.data.appearance[i]]);
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
        instance.elements.table_body.appendChild(row);
      }
    }
  }

  var table = {

    // Component's tag

    tag : "framework-table",

    // Methods

    methods : {

      // Initialize component

      initialize : function(root){

        var instance = {
          schema_name : "",
          num_of_columns : 0,
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

        // Bind event handlers

        _framework.event_emitter.on(instance.schema.events.load_settings, function(data){
          _load_settings(data, instance);
        })

        _framework.event_emitter.on(instance.schema.events.load_data, function(data){
          _load_data(data, instance);
        })

        _framework.event_emitter.on(instance.schema.events.drop_data, function(){
          _clear_elements(instance);
        })

        return instance;
      }
    }
  }

  _framework.register(table);

})();
