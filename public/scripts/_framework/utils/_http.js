// Events

(function(){

  'use strict'

  // Check framework availability

  if (typeof _framework == "undefined") {
    console.log("_http.js : No '_framework' module found! Be sure to load it up first!");
    return;
  }

  var http = {
    get : function(url, callback){
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(JSON.parse(xmlHttp.responseText));
      }
      xmlHttp.open("GET", url, true);
      xmlHttp.send(null);
    }
  }

  _framework.http = http;

})();
