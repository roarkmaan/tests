angular.module('uiDirectives',['ngTouch'])

.directive('metroMenu', ['$window',function($window){
  return {
    template:'<div style="width:100%;height:50px;position:relative;top:0px;left:0px;">' +
                //'<p ng-repeat="i in metros">{{i.nm}}</p>' +
                '<div style="width:100%;height:50px;background:blue;position:relative;top:0px;left:0px;">'+
                  //'<p style="color:white">Is this a touch device: {{touch.istouch}}<br />Is this an iOS device: {{touch.isios}}</p>'+
                '</div>' + 
             '</div>',
    replace:true,
    scope:{metros:"="},
    link:function(s,i,a){
      function metroPos(){
        var wrapper = i[0];
        var menu = i.find('div')[0];
        var wrapperTop = wrapper.getBoundingClientRect().top;
        var menuTop = menu.getBoundingClientRect().top
        //console.log("Wrapper top: "+wrapperTop+" menu top: "+menuTop);
        if(wrapperTop < 5){angular.element(menu).css({"position":"fixed","top":"0px"})}
        else{angular.element(menu).css({"position":"relative","top":"0px"})}
      }

      s.touch = {
        isios:($window.navigator.userAgent.match(/iPad|iPhone|iPod/) ? true : false),
        istouch:typeof $window.ontouchmove !== 'undefined' || typeof $window.navigator.maxTouchPoints !== 'undefined'
      }

      //TODO: implement a fixed menu on mobile 
      if(!s.touch.istouch){
        $window.onscroll = metroPos;
      }
      //Option 1: Hide menu and provide option to show -- this would bring onscroll/ontouchmove back into play
      /*
      if(s.touch.isios){
        $window.ontouchmove = metroPos;
      }*/
      
    }
  }  
}]);