
var app = app || {}; 

(function($,app, window, document, undefined) {
 
  var utility = {

    isMobile: function(){
      return navigator.userAgent.match( /(iPad)|(iPhone)|(iPod)|(Android)|(PlayBook)|(BB10)|(BlackBerry)|(Opera Mini)|(IEMobile)|(webOS)|(MeeGo)/i );
    },
    isTouch: function(){
      return utility.isMobile() !== null || document.createTouch !== undefined || ( 'ontouchstart' in window ) || ( 'onmsgesturechange' in window ) || navigator.msMaxTouchPoints;
    },
    winWidth: function(){
      return window.innerWidth ? window.innerWidth : $( window ).width();
    },
    winHeight: function(){
      return window.innerHeight ? window.innerHeight : $( window ).height();
    },
    isPortraitView: function(){
      return window.orientation == 0
    },

    getCookie: function(name){
      var property = name + "=";
      var cookieArray = document.cookie.split(';');
      for(var i=0;i < cookieArray.length;i++) {
          var c = cookieArray[i];
          while (c.charAt(0)==' ') c = c.substring(1,c.length);
          if (c.indexOf(property) == 0) return c.substring(property.length,c.length);
      }
      return null;
    },

    setCookie: function(cname, cvalue, exdays){
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires + "; domain=.nexon.net;path=/";
    }

  };

  app.utility = utility;

}(jQuery, app, window, window.document));












