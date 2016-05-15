// Framework component (table)

(function(){

  'use strict'

  // Check framework availability

  if (typeof _framework == "undefined") {
    console.log("_table.js : No '_framework' module found! Be sure to load it up first!");
    return;
  }

  if (typeof _framework.http == "undefined") {
    console.log("_table.js : No 'http' module found! Be sure to load it up first!");
    return;
  }

  var _bind_schema = function(_instance){
    _instance.schema = _framework.schemas[_instance.schema_name];
    _instance.num_of_columns = _instance.schema.data.columns.length;
  }

  var _clear_elements = function(_instance){
    if (_instance.elements.table_body){
      while (_instance.elements.table_body.firstChild) {
        _instance.elements.table_body.removeChild(_instance.elements.table_body.firstChild);
      }
    }
  }

  var _generate_elements = function(_instance){

    // Table

    _instance.elements.table = document.createElement("table");

    // Table head

    _instance.elements.table_head = document.createElement("thead");
    var row = document.createElement("tr");
    for (var i = 0; i < _instance.num_of_columns; i++) {
      var cell = document.createElement("th");
      var cellText = document.createTextNode(_instance.schema.data.columns[i]);
      cell.appendChild(cellText);
      row.appendChild(cell);
    }
    _instance.elements.table_head.appendChild(row);

    // Table body

    _instance.elements.table_body = document.createElement("tbody");
    _instance.elements.table.appendChild(_instance.elements.table_head);
    _instance.elements.table.appendChild(_instance.elements.table_body);
    _instance.elements.root.appendChild(_instance.elements.table);

    // Add classes

    _instance.elements.table.className += _instance.schema.classes.toString().split(",").join(" ");
  }

  var _load_settings = function(data, _instance){

    // Omitting success checks because of laziness
    data = JSON.parse(data).data;

    _instance.schema.data.columns = data.appearance;
    _bind_schema(_instance);
    _clear_elements(_instance);
    _generate_elements(_instance);
  }

  var _load_data = function(data, _instance){

    // Omitting success checks because of laziness
    data = JSON.parse(data).data.data;

    if (typeof data.docs != "undefined"){
      for (var j = 0; j < data.docs.length; j++) {
        var row = document.createElement("tr");
        for (var i = 0; i < _instance.num_of_columns; i++) {
          var cell = document.createElement("td");
          var cellText = document.createTextNode(data.docs[j][_instance.schema.data.columns[i]]);
          cell.appendChild(cellText);
          row.appendChild(cell);
        }
        _instance.elements.table_body.appendChild(row);
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

        var _instance = {
          schema_name : "",
          num_of_columns : 0,
          elements : {
            root : {}
          }
        };

        // Get root element

        _instance.elements.root = root;

        // Get schema name

        _instance.schema_name = _instance.elements.root.getAttribute("framework-schema");
        if (!(_framework.schemas.hasOwnProperty(_instance.schema_name))) {
          console.log("No schema defined for '" + _instance.schema_name + "' !");
          return false;
        }

        // Bind schema

        _bind_schema(_instance);

        // Bind event handlers

        _framework.event_emitter.on(_instance.schema.events.load_settings, function(data){
          _load_settings(data, _instance);
        })

        _framework.event_emitter.on(_instance.schema.events.load_data, function(data){
          _load_data(data, _instance);
        })

        _framework.event_emitter.on(_instance.schema.events.drop_data, function(){
          _clear_elements(_instance);
        })

        return _instance;
      }
    }
  }

  _framework.register(table);

})();
