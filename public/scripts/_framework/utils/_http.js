// Events

(function(){

  'use strict'

  // Check framework availability

  if (typeof _framework == "undefined") {
    console.log("_http.js : No '_framework' module found! Be sure to load it up first!");
    return;
  }

  var http = {
    post : function(url, data, callback){
      var xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
        callback(JSON.parse(xmlHttp.responseText));
      }
      xmlHttp.open("POST", url, true);
      xmlHttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xmlHttp.send(JSON.stringify(data));
    },
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
