// Filters

(function(){

  'use strict'

  // Check framework availability

  if (typeof _framework == "undefined") {
    console.log("_http.js : No '_framework' module found! Be sure to load it up first!");
    return;
  }

  // Some variables

  var url_pattern = new RegExp("(http|ftp|https)://[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:/~+#-]*[\w@?^=%&amp;/~+#-])?"); // fragment locator

  var filter_string = function(input){
    if(!url_pattern.test(input)) {
      if (isNaN(Date.parse(input))){
        return document.createTextNode(input);
      } else {
        var date = new Date(input);
        return document.createTextNode(date.toDateString());
      }
    } else {
      var a = document.createElement('a');
      var linkText = document.createTextNode(input);
      a.appendChild(linkText);
      a.title = input;
      a.href = input;
      return a;
    }
  }

  var filter_number = function(input){
    input = Math.round(input);
    var output = document.createElement('span');
    var text = document.createTextNode(input);
    if (input > 0){
      output.className = "positive-number";
    } else if (input < 0) {
      output.className = "negative-number";
    }
    output.appendChild(text);
    return output;
  }

  var filter_boolean = function(input){
    return document.createTextNode(input ? "Available" : "Not Available");
  }

  _framework.filters = {
    value : function(input){
      switch (typeof input) {
        case 'string':
        return filter_string(input);
        case 'number':
        return filter_number(input);
        case 'boolean':
        return filter_boolean(input);
        default:
        return document.createTextNode("?");
      }
    },
    title : function(input){
      return document.createTextNode(input.replace(/([A-Z]+)/g, " $1").replace(/([A-Z][a-z])/g, " $1").replace(/\b[a-z]/g,function(f){return f.toUpperCase();}));
    }
  };

})();
