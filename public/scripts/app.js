// Application

(function(){

  'use strict'

  // Check framework availability

  if (typeof _framework == "undefined") {
    console.log("app.js : No '_framework' found! Be sure to load it up first!");
    return;
  };

  if (typeof _framework.event_emitter == "undefined") {
    console.log("app.js : No 'event_emitter' module found! Be sure to load it up first!");
    return;
  };

  if (typeof _framework.http == "undefined") {
    console.log("app.js : No 'http' module found! Be sure to load it up first!");
    return;
  };

  // Some basic variables

  var current_page = 1;
  var records_per_page = 50;
  var records_to_insert = 5000;

  // Settings

  var get_settings = function(){
    console.log("Getting settings.");
    _framework.http.get("/api/settings/get", function(data){
      _framework.event_emitter.emit("event_load_settings", data);
    });
  };
  var save_settings = function(){
    console.log("Saving settings.");
    var settings = {
      appearance : _framework.schemas.tableSchema_feed.data.appearance,
      sorting : _framework.schemas.tableSchema_feed.data.sorting,
    };
    _framework.http.post("/api/settings/save", settings, function(data){
      current_page = 1;
      _framework.event_emitter.emit("event_generate_table", data);
    });
  };
  var reset_settings = function(){
    console.log("Resetting settings.");
    _framework.http.post("/api/settings/save", {}, function(data){
      current_page = 1;
      get_settings();
    });
  };

  // Feed

  var load = function(records_per_page){
    console.log("Loading page " + current_page + " by " + records_per_page + " records per page.");
    _framework.http.get("/api/records/get/" + current_page++ + "/" + records_per_page, function(data){
      if (data.data.success) {
        _framework.event_emitter.emit("event_load_data", data);
      } else {
        console.log("No records left.");
        current_page--;
      };
    });
  };
  var refresh = function(){
    console.log("Refreshing feed.");
    current_page = 1;
    _framework.event_emitter.emit("event_drop_data");
  };
  var insert = function(){
    console.log("Inserting " + records_to_insert + " records.");
    _framework.http.get("/api/records/add/" + records_to_insert, function(data){
      refresh();
    });
  };
  var drop = function(){
    console.log("Dropping feed.");
    _framework.http.get("/api/records/drop", function(data){
      refresh();
    });
  };

  // Application events

  window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      load(records_per_page);
      console.log("Scrolled to bottom.");
    };
  };

  // Define schemas

  _framework.schemas = {

    // Buttons

    buttonSchema_load : {
      classes : [
        'button'
      ],
      data : {
        label : "Load (" + records_per_page + ")"
      },
      methods : {
        click : function(){
          load(records_per_page);
          console.log("buttonSchema_load button has been pressed.");
        }
      }
    },
    buttonSchema_clear : {
      classes : [
        'button '
      ],
      data : {
        label : "Refresh"
      },
      methods : {
        click : function(){
          refresh();
          console.log("buttonSchema_clear button has been pressed.");
        }
      }
    },
    buttonSchema_db_records_drop : {
      classes : [
        'button'
      ],
      data : {
        label : "Drop Records"
      },
      methods : {
        click : function(){
          drop();
          console.log("buttonSchema_db_records_drop button has been pressed.");
        }
      }
    },
    buttonSchema_db_records_insert : {
      classes : [
        'button'
      ],
      data : {
        label : "Insert Records (" + records_to_insert + ")"
      },
      methods : {
        click : function(){
          insert();
          console.log("buttonSchema_db_records_insert button has been pressed.");
        }
      }
    },
    buttonSchema_db_settings_reset : {
      classes : [
        'button'
      ],
      data : {
        label : "Reset Settings"
      },
      methods : {
        click : function(){
          reset_settings();
          console.log("buttonSchema_sb_settings_reset button has been pressed.");
        }
      }
    },

    // Tables

    tableSchema_feed : {
      classes : [
        'table'
      ],
      data : {
        label : "Feed",
        appearance : []
      },
      methods : {
        column_click : function(column_name){
          save_settings();
          console.log("Column " + column_name + " clicked.");
        },
        table_generated : function(){
          load(records_per_page);
        },
        data_dropped : function(){
          load(records_per_page);
        }
      },
      events : {
        load_settings : "event_load_settings",
        generate_table : "event_generate_table",
        load_data : "event_load_data",
        drop_data : "event_drop_data"
      }
    }
  }

  // Initialize _framework on document load

  document.addEventListener("DOMContentLoaded", function(){
      _framework.bootstrap();
      get_settings();
    }
  );
})();
