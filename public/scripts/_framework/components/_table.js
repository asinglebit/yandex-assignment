// Framework component (table)

(function () {

    'use strict';

    // Check framework availability

    if (typeof _framework === "undefined") {
        console.log("_table.js : No '_framework' module found! Be sure to load it up first!");
        return;
    };

    if (typeof _framework.http === "undefined") {
        console.log("_table.js : No 'http' module found! Be sure to load it up first!");
        return;
    };

    if (typeof _framework.filters === "undefined") {
        console.log("_table.js : No 'filters' module found! Be sure to load it up first!");
        return;
    };

    function Table(root) {
        var self = this;

        this.num_of_columns = 0;
        this.elements = {
            root: root
        };
        this.schema_name = root.getAttribute('framework-schema');
        if (!_framework.schemas[this.schema_name]) {
            console.error("No schema defined for '" + this.schema_name + "' !");
        };

        // Bind schema

        this._bind_schema();

        // Bind event handlers

        _framework.event_emitter.on(this.schema.events.load_settings, function(data){
          self._load_settings(data);
        })

        _framework.event_emitter.on(this.schema.events.generate_table, function(){
          self._generate_elements();
        })

        _framework.event_emitter.on(this.schema.events.load_data, function(data){
          self._load_data(data);
        })

        _framework.event_emitter.on(this.schema.events.drop_data, function(){
          self._clear_elements();
          self.schema.methods.data_dropped();
        })
    };

    Table.prototype._bind_schema = function() {
        this.schema = _framework.schemas[this.schema_name];
        this.num_of_columns = this.schema.data.columns.length;
    };

    Table.prototype._update_schema = function(){
      _framework.schemas[this.schema_name] = this.schema;
    };

    Table.prototype._bind_schema = function(){
      this.schema = _framework.schemas[this.schema_name];
      this.num_of_columns = this.schema.data.appearance.length;
    };

    Table.prototype._clear_elements = function(){
      if (this.elements.table_body){
        while (this.elements.table_body.firstChild) {
          this.elements.table_body.removeChild(this.elements.table_body.firstChild);
        }
      }
    };

    Table.prototype._clear_root = function(){
      if (this.elements.root){
        while (this.elements.root.firstChild) {
          this.elements.root.removeChild(this.elements.root.firstChild);
        }
      }
    };

    Table.prototype._generate_elements = function(){

      var self = this;

      this._clear_root();
      this._bind_schema();

      // Table

      this.elements.table = document.createElement("table");

      // Table head

      this.elements.table_head = document.createElement("thead");
      var row = document.createElement("tr");
      for (var i = 0; i < this.num_of_columns; i++) {

        // Cell

        var cell = document.createElement("th");

        // Column Name

        var spanColumnName = document.createElement("span");
        var cellTextName = _framework.filters.title(this.schema.data.appearance[i]);
        spanColumnName.appendChild(cellTextName);
        cell.appendChild(spanColumnName);
        row.appendChild(cell);

        // IIFE to save the scope of the column name holding variable

        (function(){

          var columnName = self.schema.data.appearance[i];

          // Sortable column

          if (!self.schema.data.sorting.disabled.toString().includes(self.schema.data.appearance[i])){
            spanColumnName.className = "link";
            spanColumnName.addEventListener("click", function(){
              self.schema.data.sorting.column = columnName;
              self.schema.data.sorting.ascending = !self.schema.data.sorting.ascending;
              self._update_schema();
              self.schema.methods.column_click(columnName);
            });
          };

          // Hide button

          if (!self.schema.data.sorting.fixed.toString().includes(self.schema.data.appearance[i])){
            var spanHide = document.createElement("span");
            var cellTextHide = document.createTextNode("x ");
            spanHide.appendChild(cellTextHide);
            spanHide.className = "link framework-right";
            cell.appendChild(spanHide);

            spanHide.addEventListener("click", function(){
              var index = self.schema.data.appearance.indexOf(columnName);
              if (index !== -1) {
                self.schema.data.appearance.splice(index, 1);
              }
              self._update_schema();
              self.schema.methods.column_click(columnName);
            });
          };

          // Left button

          if (!self.schema.data.sorting.fixed.toString().includes(self.schema.data.appearance[i])){
            var index = self.schema.data.appearance.indexOf(columnName);
            if ((index !== -1) && (index < self.schema.data.appearance.length) && (index > 0)){
              if (!self.schema.data.sorting.fixed.toString().includes(self.schema.data.appearance[index - 1])){
                var spanLeft = document.createElement("span");
                var cellTextLeft = document.createTextNode("<");
                spanLeft.appendChild(cellTextLeft);
                spanLeft.className = "link framework-left";
                cell.appendChild(spanLeft);

                spanLeft.addEventListener("click", function(){
                  var removed = self.schema.data.appearance.splice(index, 1)[0];
                  self.schema.data.appearance.splice(index - 1, 0, removed)
                  self._update_schema();
                  self.schema.methods.column_click(columnName);
                });
              };
            };
          };

          // Right button

          if (!self.schema.data.sorting.fixed.toString().includes(self.schema.data.appearance[i])){
            var index = self.schema.data.appearance.indexOf(columnName);
            if ((index !== -1) && (index < self.schema.data.appearance.length - 1) && (index > 0)){
              if (!self.schema.data.sorting.fixed.toString().includes(self.schema.data.appearance[index + 1])){
                var spanRight = document.createElement("span");
                var cellTextRight = document.createTextNode(">");
                spanRight.appendChild(cellTextRight);
                spanRight.className = "link";
                cell.appendChild(spanRight);

                spanRight.addEventListener("click", function(){
                  var removed = self.schema.data.appearance.splice(index, 1)[0];
                  self.schema.data.appearance.splice(index + 1, 0, removed)
                  self._update_schema();
                  self.schema.methods.column_click(columnName);
                });
              };
            };
          };

        })();
      };

      this.elements.table_head.appendChild(row);

      // Table body

      this.elements.table_body = document.createElement("tbody");
      this.elements.table.appendChild(this.elements.table_head);
      this.elements.table.appendChild(this.elements.table_body);
      this.elements.root.appendChild(this.elements.table);

      // Add classes

      this.elements.table.className += this.schema.classes.toString().split(",").join(" ");

      this.schema.methods.table_generated();
    };

    Table.prototype._load_settings = function(data){
      data = data.data;
      this.schema.data.appearance = data.appearance;
      this.schema.data.sorting = data.sorting;
      this._bind_schema();
      this._generate_elements();
    };

    Table.prototype._load_data = function(data){
      data = data.data.data;
      if (typeof data.docs != "undefined"){
        for (var j = 0; j < data.docs.length; j++) {
          var row = document.createElement("tr");
          for (var i = 0; i < this.num_of_columns; i++) {
            var cell = document.createElement("td");
            var cellText = _framework.filters.value(data.docs[j][this.schema.data.appearance[i]]);
            cell.appendChild(cellText);
            row.appendChild(cell);
          };
          this.elements.table_body.appendChild(row);
        };
      };
    };

    _framework.register({
        constructor: Table,
        tag: 'framework-table'
    });
})();
