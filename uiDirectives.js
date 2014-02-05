angular.module('uiDirectives',['libServices'])

//geoMenus creates a 60px banner with a menu of geographies to choose from
//it has an attributes 'geos' and 'thisgeo' to (2-way) bind to an array of geography objects and the code of the currently selected geography
//the about attribute is used to an an "about the data" section
angular.module('uiDirectives').directive('geoMenu', ['$window',function($window){
  return {
    template:'<div class="grouping" style="width:100%;min-width:450px;min-height:60px;position:relative;top:0px;left:0px;margin-bottom:30px;">' +
                //'<p ng-repeat="i in metros">{{i.nm}}</p>' +
                '<div class="blueBar" style="float:left;width:100%;height:auto;min-height:60px;background:rgb(33,114,222);position:relative;top:0px;left:0px;">'+
                  '<div style="margin:18px 20px 0px 13px;padding:3px 3px 10px 3px;float:left;" class="grouping">' +  
                    '<select style="float:left;padding:5px 6px 1px 6px;margin:0px 15px 0px 0px;height:2em;background:#ffffff;background-image:none;border:none;border-radius:3px;outline:none;position:relative;" ng-model="thisgeo" ng-options="m.gcode as m.nm for m in geos"> </select>'+
                    '<p class="disable-select" style="float:left;white-space:nowrap;cursor:pointer;margin:.75em 0px .25em 12px;font-size:13px;color:#ffffff" ng-click="showAbout()">About the data <span style="font-family:Courier,monospace;font-weight:bold">[+]</span></p>' +
                  '</div>' +
                  '<div style="position:absolute;top:100%;height:2px;width:100%;background:#ffffff;overflow:visible">'+
                    '<div ng-mouseleave="showAbout()" style="width:98%;min-height:150px;max-height:380px;overflow-y:auto;background:#ffffff;border:1px solid rgb(33,114,222);border-width:0px 0px 1px 0px;display:none;padding:8px 1% 0px 1%;margin:0px">'+
                      '<p ng-repeat="p in about" style="font-weight:{{p.weight}};font-size:12px;line-height:1.4em;margin:10px 15px 0px 15px;">{{p.text}}</p>' +
                      '<div style="width:100%;height:20px;background-image:none;background:#ffffff;"></div>' +
                    '</div>'+
                  '</div>'+
                  //'<p style="color:white">Is this a touch device: {{touch.istouch}}<br />Is this an iOS device: {{touch.isios}}</p>'+
                '</div>' + 
             '</div>',
    replace:true,
    scope:{geos:"=",thisgeo:"=",about:"="},
    link:function(s,i,a){

      var wrapper = i[0];
      var menu = i.find('div')[0];
      var about = angular.element(i.find('div')[3]);
      var plusminus = angular.element(i.find('span')[0]);

      s.bolded = function(bolded){
        if(bolded=="bold"){return "bold"}
        else{return "normal"}
      }

      s.showAbout = function(){
        var show = about.css('display');
        //console.log(show);
        if(show=="none"){about.css('display','block');plusminus.text("[–]");}
        else{about.css('display','none');plusminus.text("[+]");}
      }

      function initpos(){
        //console.log(wrapper.getBoundingClientRect());
      }

      function metroPos(){
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

angular.module('uiDirectives').directive('dPoint', ['$timeout',function($timeout){
  return {
    template:'<div class="grouping" style="width:auto;float:left;position:relative;top:0px;left:0px;background:rgb(230,230,230);margin:0px 15px 15px 0px;">' +
                '<div class="grouping" ng-style="styles" style="float:left;">' +
                 '<p style="float:left;color:rgb(100,100,100)">{{data.title}}</p>' +
                 '<div style="float:right;clear:both;width:auto;" ng-repeat="d in data.points" ng-init="last($last)">' +
                   '<p style="float:right;clear:both;font-size:0.75em;text-transform:uppercase;color:rgb(100,100,100);margin-top:15px;margin-left:2px;">{{d.head}}</p>' +
                   '<p style="float:right;clear:both;font-size:2.5em;color:rgb(5,55,105);">{{d.value}}' +
                   '<p style="float:right;clear:both;font-size:0.75em;text-transform:uppercase;color:rgb(100,100,100);margin-left:2px;">{{d.foot}}' +
                 '</div>' +
                '</div>' +
             '</div>',
    restrict:'AC',
    replace:true,
    scope:{data:"=",w:"@",h:"@",pad:"@"},
    link:function(s,i,a){

      var wrapper = i[0];
      var layer1 = i.find('div')[0];
      var width = parseInt(s.w);
      var padding = parseInt(s.pad);
      s.styles = {"min-width":s.w,"min-height":s.h,"padding":s.pad};
      //console.log(s.styles);


      //determine width of inner div
      /*
      s.last = function(last){
        if(last){
          $timeout(function(){
            var fWidth = i[0].getBoundingClientRect().width;
            var iWidth = layer1.getBoundingClientRect().width;
            if(width > iWidth){
              var margin = Math.floor((width - iWidth)/2);
              angular.element(layer1).css("margin-left",(margin-2)+"px");
            }
           },100)
        }
      } */    
    }
  }  
}]);

//Vertical wrapper -- Creates a section with a square bullet and title, along with text describing the section
//This is vertical because the section description will occur above the data element
//This directive is able to wrap any data element which will be transcluded in
angular.module('uiDirectives').directive('wrapperV', ['$timeout',function($timeout){
  return {
    template:'<div class="grouping" style="float:left;margin:10px 40px 20px 10px;page-break-inside:avoid;width:auto;">' +
                '<div class="blueBar" style="width:22px;height:22px;position:absolute;top:0px;left:0px;"></div>'+
                '<div style="margin-left:35px;float:left;" class="grouping">'+
                  '<div style="min-height:35px;width:100%;float:left;margin-bottom:15px;max-width:{{maxWidth()}}" class="grouping sectionText">' +
                    '<div class="grouping">' +
                      '<p style="line-height:1em;font-size:1em;font-weight:bold;margin-top:6px;margin-bottom:10px;vertical-align:bottom;">{{tytl}}</p>' + 
                      '<p ng-repeat="t in text track by $index">{{t}}</p>' + 
                    '</div>' +
                  '</div>' +
                  '<div ng-transclude class="grouping" style="width:auto;"></div>' +
                '</div>' +
             '</div>',
    replace:true,
    scope:{tytl:"@",text:"=",w:"@"},
    transclude:true,
    link:function(s,i,a){
      var wrapper = i[0];
      var main = i.find("div")[4];
      var ngMain = angular.element(main).children();
      var text = i.find("div")[2]; //the max width of this should equal the sum of widths in ngMain
      
      s.width = function(){return (typeof s.w !== "undefined") ? s.w : "auto";}

      //s.consoleLog = function(){alert("CONSOLE");}

      s.maxWidth = function(){
        var tot = 0;
        for(var i=0;i<ngMain.length;i++){
          var r = ngMain[i].getBoundingClientRect();
          tot = tot + (r.right-r.left);
        }
        return((tot+35)+"px");
      }

      $timeout(function(){return "ANOTHER $DIGEST"},4000);

      //set a max width based on width of transclusion
    }
  }
}]);

angular.module('uiDirectives').directive('wrapperH', ['$timeout',function($timeout){
  return {
    template:'<div class="grouping" style="float:left;margin:10px 40px 20px 10px;page-break-inside:avoid;width:100%">' +
                '<div class="blueBar" style="width:22px;height:22px;position:absolute;top:0px;left:0px;"></div>'+
                '<div style="margin-left:35px;float:left;width:100%" class="grouping">'+
                  '<div style="min-height:35px;float:left;margin-bottom:15px;margin-right:20px;" class="grouping thirty100">' +
                    '<p style="line-height:1em;font-size:1em;font-weight:bold;margin-top:6px;margin-bottom:10px;">{{tytl}}</p>' + 
                    '<p style="" ng-repeat="t in text track by $index">{{t}}</p>' + 
                  '</div>' +
                  '<div ng-transclude class="grouping" style="width:auto;float:left"></div>' +
                '</div>' +
             '</div>',
    replace:true,
    scope:{tytl:"@",text:"=",w:"@"},
    transclude:true,
    link:function(s,i,a){
      var wrapper = i[0];
      var main = i.find("div")[3];
      var ngMain = angular.element(main).children();
      var text = i.find("div")[2]; //the max width of this should equal the sum of widths in ngMain

      s.maxWidth = function(){
        var tot = 0;
        for(var i=0;i<ngMain.length;i++){
          var r = ngMain[i].getBoundingClientRect();
          tot = tot + (r.right-r.left);
        }
        return( ((tot-60) > 0 ? (tot-60) : 0)+"px");
      }

      $timeout(function(){return "ANOTHER $DIGEST"},4000);

      //set a max width based on width of transclusion
    }
  }
}]);


angular.module('uiDirectives').directive('flexWrapper', [function(){
  return {
    template:'<div class="grouping" style="margin:10px 0px 10px 10px;">' +
                '<div ng-transclude></div>' +
             '</div>',
    replace:true,
    scope:false,
    transclude:true,
    link:function(s,i,a){
      var wrapper = i[0];
      s.width = function(){
        return (typeof s.w !== "undefined") ? s.w : "auto";
      }
      //set a max width based on width of transclusion
    }
  }
}]);

angular.module('uiDirectives').directive('tableCard', [function(){
  return {
    template:'<div class="grouping" style="margin:0px 15px 15px 0px;float:left;">' +
                '<table style="min-width:{{w}};"><thead></thead><tbody>' +
                  '<tr ng-init="rowNum=$index" ng-repeat="r in data">' +
                    '<td ng-repeat="c in r" style="{{tdStyle(rowNum,$index)}}">{{c}}</td>' +
                  '</tr>' +
                '</tbody></table>' +
             '</div>',
    replace:true,
    scope:{data:"=",w:"@"},
    transclude:false,
    link:function(s,i,a){
      var wrapper = i[0];
      s.tdStyle = function(row,index){
        var r = "";
        if(index==0 || row==0){r=r+"font-weight:bold;"}
        else{r=r+"color:rgb(5,55,105);"}
        if(row==0){r=r+"background-color:rgb(220,220,220)"};
        return r;
      }
      //set a max width based on width of transclusion
    }
  }
}]);



angular.module('uiDirectives').directive('autoLayout', ['jqService','$timeout',function(jqService,$timeout){
  return {
    template:'<div></div>',
    replace:false,
    scope:false,
    transclude:false,
    link:function(s,i,a){
      var heights = [];
      var rects = [];
      function textVerts(){
        //get positions of text boxes
        var textBoxes = $(".sectionText");
        var innerBoxes = textBoxes.children("div");
        console.log(innerBoxes);

        innerBoxes.each(function(i){
          var r = this.getBoundingClientRect();
          heights[i] = r.bottom - r.top;
          rects[i] = r;
        });

        //adjacency groups
        var adj = [];
        var levels = [];
        var num = 0;
        for(var i=0;i<rects.length;i++){
          adj.push([rects[i].bottom-rects[i].top]);
          for(var j=i+1;j<rects.length;j++){
            if(Math.abs(rects[i].top-rects[j].top) < 15){
              adj[num].push(rects[j].bottom-rects[j].top);
            }
            else{
              i=j-1;
              num++;
              break;
            }
          }
        }

        function level(grp){
          var r = [];
          for(var i=0;i<grp.length;i++){
            var mx = Math.max.apply(Math,grp[i]);
            var mn = Math.min.apply(Math,grp[i]);
            var m = mx==mn ? "auto" : Math.round(mx) + "px";

            for(var j=0;j<grp[i].length;j++){
              r.push(m);
            }
            
          }
          return r;
        }

        var newLengths = level(adj);
        textBoxes.each(function(i){
          $(this).css("height",newLengths[i]);
        });

        console.log(newLengths);
        //var max = 
        
        //textBoxes.css("height",max+"px");
        pollster();
      }//end textVerts

      //var fib = [1000,1000];
      //var t = 2000;
      function pollster(){
        //if(t<21000){t=fib[0]+fib[1];fib[0]=fib[1];fib[1]=t} 
        //if(rects.length <= 1){return} //no need for auto layout -- fails if we destroy a node
        $timeout(textVerts,1500);
        //console.log(fib);
      }

      textVerts();
     
    }
  }
}]);