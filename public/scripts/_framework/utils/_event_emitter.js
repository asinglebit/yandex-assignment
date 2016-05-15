// Events

(function(){

  'use strict'  

  // Check framework availability

  if (typeof _framework == "undefined") {
    console.log("_event_emitter.js : No _framework found! Be sure to load it up first!");
    return;
  }

  event_emitter.instance = (function(){
    var inst = new event_emitter();
    return function (){ return inst; };
  })();

  function event_emitter (){
    this.eventList = this.eventList || {};
  }

  function _emit(event,data){
    if(this.eventList[event]){
      for (var i = 0; i< this.eventList[event].length; i++) {
        this.eventList[event][i](data);
      };
    }
  };

  event_emitter.prototype.on = function(event, callback){
    this.eventList[event] = this.eventList[event] || [];
    this.eventList[event].push(callback);
  };
  event_emitter.prototype.emit = function(event, data){
    _emit.apply(this, [event, data])
  };

  _framework.event_emitter = event_emitter.instance();

})();
