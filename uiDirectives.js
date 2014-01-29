angular.module('uiDirectives',[])

.directive('metroMenu', ['$window',function($window){
  return {
    template:'<div style="width:100%;height:50px;position:relative;top:0px;left:0px;">' +
                //'<p ng-repeat="i in metros">{{i.nm}}</p>' +
                '<div style="width:100%;height:50px;background:blue;position:relative;top:0px;left:0px;"></div>' + 
             '</div>',
    replace:true,
    scope:{metros:"="},
    link:function(s,i,a){
      function metroPos(){
        var wrapper = i[0];
        var menu = i.find('div')[0];
        var wrapperTop = wrapper.getBoundingClientRect().top;
        var menuTop = menu.getBoundingClientRect().top
        console.log("Wrapper top: "+wrapperTop+" menu top: "+menuTop);
        if(wrapperTop < 5){angular.element(menu).css({"position":"fixed","top":"0px"})}
        else{angular.element(menu).css({"position":"relative","top":"0px"})}
      }
      metroPos();
      $window.onscroll = function(){
        metroPos();
      }
      
    }
  }  
}]);