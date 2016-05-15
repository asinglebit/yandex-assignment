// Application

(function(){

  'use strict'

  // Check framework availability

  if (typeof _framework == "undefined") {
    console.log("app.js : No _framework found! Be sure to load it up first!");
    return;
  }

  if (typeof _framework.event_emitter == "undefined") {
    console.log("app.js : No _event_emitter found! Be sure to load it up first!");
    return;
  }

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
          _framework.event_emitter.emit("event_load_feed");
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
          _framework.event_emitter.emit("event_clear_feed");
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
        columns : ["Title", "Author", "Link", "Publication Date", "Rating", "Availability"]
      },
      methods : {
        click : function(){}
      },
      events : {
        load_data : "event_load_feed",
        drop_data : "event_clear_feed"
      }
    }
  }

  // Initialize _framework on document load

  document.addEventListener("DOMContentLoaded", _framework.bootstrap);
})();
