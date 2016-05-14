module.exports = {
  randomDate : function () {
      var start = new Date(1900, 0, 1);
      var end  = new Date();
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  },

  randomString : function (){
      return Math.random().toString(36).slice(2);
  },

  randomURL : function (){
      return "https://www." + this.randomString() + ".ru";
  },

  randomNumber : function (){
      return Math.floor(Math.random() * 201) - 100;
  },

  randomBoolean : function (){
      return !!Math.floor(Math.random() * 2);
  }
};
