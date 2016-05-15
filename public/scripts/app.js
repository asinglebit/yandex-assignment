// Application

(function(){

  'use strict'

  // Check framework availability

  if (typeof _framework == "undefined") {
    console.log("app.js : No '_framework' found! Be sure to load it up first!");
    return;
  }

  if (typeof _framework.event_emitter == "undefined") {
    console.log("app.js : No 'event_emitter' module found! Be sure to load it up first!");
    return;
  }

  // Load Settings

  _framework.http.get("/api/settings/get", function(data){
    _framework.event_emitter.emit("event_load_settings", data);
  });

  // Define schemas

  _framework.schemas = {

    // Buttons

    buttonSchema_load : {
      classes : [
        'button'
      ],
      data : {
        label : "Load"
      },
      methods : {
        click : function(){
          _framework.http.get("/api/records/get/1", function(data){
            _framework.event_emitter.emit("event_load_data", data);
          });
          console.log("buttonSchema_load button has been pressed.");
        }
      }
    },
    buttonSchema_clear : {
      classes : [
        'button '
      ],
      data : {
        label : "Clear"
      },
      methods : {
        click : function(){
          _framework.event_emitter.emit("event_drop_data");
          console.log("buttonSchema_clear button has been pressed.");
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
        columns : []
      },
      methods : {
        click : function(){}
      },
      events : {
        load_settings : "event_load_settings",
        load_data : "event_load_data",
        drop_data : "event_drop_data"
      }
    }
  }

  // Initialize _framework on document load

  document.addEventListener("DOMContentLoaded", _framework.bootstrap);
})();
