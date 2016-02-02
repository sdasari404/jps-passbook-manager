$(document).ready(function(){$(".collapse").collapse(),$(".scroll").click(function(a){a.preventDefault(),$("html,body").animate({scrollTop:$(this.hash).offset().top-50},"slow")}),$(document).find(".delete-btn").on("click",function(a){a.preventDefault();var b=confirm("DELETE: Are you sure?");return b?!0:void console.log(a)}),$(".page-header h1").bind("click",function(){$(this).next().slideToggle(200)}),$("legend").on("click",function(a){console.log(a),$(this).next().slideToggle(200)}),$(".toggle").bind("click",function(){$(this).next("div").slideToggle(200)}),console.log("document is ready")});var jpsPassbookManagerApp=angular.module("jpsPassbookManagerApp",["ngRoute","ngAnimate","ngResource","ui.ace","mgcrea.ngStrap"]).factory("App",["$rootScope","Api","$http","$routeParams","$location",function(a,b,c,d,e){a.location=e;var f=b;a.passTypes=[{value:"generic",name:"Generic"},{value:"boardingPass",name:"Boarding Pass"},{value:"coupon",name:"Coupon"},{value:"eventTicket",name:"Event Ticket"},{value:"storeCard",name:"Store Card"}];var g={http:c,debug:!0,db:f,api:b,title:"Pass Manager",description:"With this interface you can easily manage Apple Wallet Passes.",icon:"edit",hero:{title:"Easy Passes",body:"With this interface you can easily create Apple iOS Passbook Passes."},passTypes:a.passTypes,session:{user:{_id:"user-jonniespratley",provider:"",id:"",displayName:"",username:"jonniespratley",password:"",name:{familyName:"",givenName:"",middleName:""},emails:[{value:"",type:""}],photos:[],passTypeIdentifiers:[],data:null,_key:"user-jonniespratley"}},menu:[{id:null,slug:"home",title:"Home",icon:"home",href:"#/home"},{id:null,slug:"manage",title:"Manage",icon:"edit",href:"#/manage"},{id:null,slug:"passes",title:"Passes",icon:"tags",href:"#/passes"}],alerts:[],alert:function(b,c){$scope.$apply(function(){a.App.alert={type:b,body:c}})},hideModals:function(){$(".modal").modal("hide"),$(".modal-backdrop").remove()},savePass:function(a){var b=this;a=a||{},console.log("savePass",a),a._id?f.put(a).then(function(a){console.log("response",a),$scope.pass=a.data,b.hideModals(),e.path("/passes")})["catch"](function(a){console.error("savePass",a)}):f.post(a).then(function(a){console.log("createPass",a),b.hideModals(),e.path("/passes/"+a.data._id)})["catch"](function(a){console.error("db.post",a),alert("Error while creating pass")})}};return g}]).controller("AppCtrl",["$scope","$rootScope","App","$http",function(a,b,c,d){b.App=c}]).config(["$routeProvider",function(a){var b={delay:function(a,b){var c=a.defer();return b(c.resolve,0),c.promise}};a.when("/",{templateUrl:"./views/main.html",controller:"MainCtrl",resolve:b}).when("/manage",{templateUrl:"./views/manage.html",controller:"ManageCtrl",resolve:{user:function(a){return a.session.user}}}).when("/passes",{templateUrl:"./views/passes.html",controller:"PassesCtrl",resolve:{passes:function(a){return a.request({method:"GET",url:"/api/v1/admin/find?docType=pass"}).then(function(a){return a.data})}}}).when("/passes/:id",{templateUrl:"./views/pass_details.html",controller:"DetailCtrl",resolve:{pass:function(a,b){return a.current.params?b.get(a.current.params.id).then(function(a){return a.data}):void 0}}}).when("/docs",{templateUrl:"./views/docs.html",controller:"DocsCtrl",resolve:b}).when("/server",{templateUrl:"./views/server.html",controller:"ServerCtrl",resolve:{logs:function(a){return a.request({method:"GET",url:"/api/v1/admin/find?docType=log"}).then(function(a){return a.data})},devices:function(a){return a.request({method:"GET",url:"/api/v1/admin/find?docType=device"}).then(function(a){return a.data})},registrations:function(a){return a.request({method:"GET",url:"/api/v1/admin/find?docType=registration"}).then(function(a){return a.data},function(){return[]})}}}).otherwise({redirectTo:"/"})}]);jpsPassbookManagerApp.config(["$provide",function(a){return a.decorator("$rootScope",["$delegate",function(a){return a.safeApply=function(b){var c=a.$$phase;"$apply"===c||"$digest"===c?b&&"function"==typeof b&&b():a.$apply(b)},a}])}]),jpsPassbookManagerApp.directive("passFileGroup",function(a){return{restrict:"E",replace:!0,transclude:!1,scope:{passId:"@",url:"@",hint:"@",title:"@",model:"="},templateUrl:"views/_pass-file-group.html",link:function(a,b,c){function d(b){console.warn("Sending",b);var c=new FormData;c.append("_id",a.passId),c.append("files",b);var d=new XMLHttpRequest;d.addEventListener("readystatechange",function(){4===this.readyState&&console.log(this.responseText)}),d.open("POST","/api/v1/upload"),d.send(c)}function e(a){for(console.warn("file changed",a),g=a.target.files,j=g.length,i;j>i;i++)f=g[i],console.warn("processing",f),k[f.name]=f,d(f)}var f,g,h=b.find("input[type=file]"),i=0,j=0,k={};h.bind("change",function(a){e(a)}),console.log("passFileGroup - linked")}}}).directive("passFieldGroup",function(){return{restrict:"E",replace:!0,transclude:!1,scope:{label:"@",add:"&onAdd",remove:"&onRemove",fields:"="},templateUrl:"views/_pass-field-group.html",link:function(a,b,c){a.fields||(a.fields=[]),a.$on("$destroy",function(){b.remove()}),a.remove=function(b){console.warn("remove",b),a.fields.splice(b,1)},a.add=function(b){console.warn("add",b),a.fields.push({key:"key",label:"label",value:"value"})},console.log("passFieldGroup - linked",a)}}}),jpsPassbookManagerApp.directive("ngEnter",function(){return function(a,b,c){b.bind("keypress",function(b){13===b.charCode&&a.$apply(c.ngEnter)})}}).directive("ngColorpicker",function(){return{restrict:"A",replace:!0,transclude:!1,scope:{id:"@",ngModel:"@",title:"@",image:"@"},template:'<input class="colorpicker" type="text" id="{{id}}-colorpicker"/>',link:function(a,b,c){angular.element(".colorpicker").colorpicker(),console.log("function")}}}).directive("ngBarcode",function(){return{restrict:"A",replace:!0,transclude:!1,scope:{id:"@",ngModel:"@",text:"@",image:"@"},template:'<div class="qrcode"></div>',link:function(a,b,c){$(b).qrcode({width:100,height:100,text:a.text}),console.log("function")}}}).directive("myTable",function(){return function(a,b,c){var d={};d=c.myTable.length>0?a.$eval(c.myTable):{bStateSave:!0,iCookieDuration:2419200,bJQueryUI:!0,bPaginate:!1,bLengthChange:!1,bFilter:!1,bInfo:!1,bDestroy:!0};var e=[];b.find("th").each(function(a,b){e.push($(b).text())}),e.length>0?d.aoColumns=e:c.aoColumns&&(d.aoColumns=a.$eval(c.aoColumns)),c.aoColumnDefs&&(d.aoColumnDefs=a.$eval(c.aoColumnDefs)),c.fnRowCallback&&(d.fnRowCallback=a.$eval(c.fnRowCallback));var f=b.dataTable(d);a.$watch(c.aaData,function(b){var d=b||null;d&&(f.fnClearTable(),f.fnAddData(a.$eval(c.aaData)))})}}).directive("inlineEdit",function(){return{templateUrl:"componentTpl.html",scope:{model:"accessor"}}}).directive("contenteditable",function(){return{require:"ngModel",link:function(a,b,c,d){b.bind("blur",function(){a.$apply(function(){d.$setViewValue(b.html())})}),d.render=function(a){b.html(a)},d.$setViewValue(b.html()),b.bind("keydown",function(a){console.log("keydown "+a.which);var c=27==a.which,e=a.target;c&&(console.log("esc"),d.$setViewValue(b.html()),e.blur(),a.preventDefault())})}}}).directive("tabs",function(){return{restrict:"E",transclude:!0,scope:{},controller:function(a,b){var c=a.panes=[];a.select=function(a){angular.forEach(c,function(a){a.selected=!1}),a.selected=!0},this.addPane=function(b){0==c.length&&a.select(b),c.push(b)}},template:'<div class="tabbable"><ul class="nav nav-tabs"><li ng-repeat="pane in panes" class="nav-item"><a href="" ng-click="select(pane)" ng-class="{active:pane.selected}" class="nav-link"> <i class="icon-{{pane.icon}}"></i> {{pane.title}}</a></li></ul><div class="tab-content" ng-transclude></div></div>',replace:!0}}).directive("pane",function(){return{require:"^tabs",restrict:"E",transclude:!0,scope:{title:"@",icon:"@"},link:function(a,b,c,d){d.addPane(a)},template:'<div class="tab-pane" ng-class="{active: selected}" ng-transclude></div>',replace:!0}}).directive("box",function(){return{restrict:"E",transclude:!0,scope:"isolate",locals:{title:"bind"},template:'<div style="border: 1px solid black;"><div style="background-color: gray">{{title}}</div><div ng-transclude></div></div>'}}).directive("mediaobject",function(){return{restrict:"E",replace:!0,transclude:!0,scope:{title:"@",href:"@",image:"@",showicon:"@",icon:"@",body:"@"},template:'<div class="media"><a class="pull-left" href="{{href}}"><span class="icon" ng-show="{{showicon}}"><i class="feature-icon icon-{{icon}}"></i></span><img class="media-object" ng-hide="{{showicon}}" src="{{image}}"/></a><div class="media-body"><h4 class="media-heading">{{title}}</h4><p>{{body}}</p><div ng-transclude></div></div></div>'}}).directive("iconObject",function(){return{restrict:"E",replace:!0,transclude:!0,scope:{title:"@",href:"@",image:"@",showicon:"@",icon:"@",body:"@"},template:'<div class="media"><a class="pull-left" href="{{href}}"><span class="icon"><i class="feature-icon icon-{{icon}}"></i></span></a><div class="media-body"><h4 class="media-heading">{{title}}</h4><p>{{body}}</p><div ng-transclude></div></div></div>'}}).directive("featureitem",function(){return{restrict:"E",replace:!0,transclude:!0,scope:{title:"@",href:"@",image:"@",icon:"@",body:"@"},template:'<div class="feature-item"><div class="feature-thumb pull-left"><img ng-src="{{image}}" class="feature-img" /></div><h3 class="ng-binding"><i class="feature-icon icon-{{icon}}"></i> {{title}}</h3><p class="description" ng-transclude></p></div>'}}).directive("featureObject",function(){return{restrict:"E",replace:!0,transclude:!0,scope:{title:"@",href:"@",image:"@",icon:"@",body:"@"},template:'<div class="feature-item feature-object"><div class="feature-thumb pull-left"><img ng-src="{{image}}" class="feature-img" /></div><h3 class="ng-binding">{{title}}</h3><p class="description" ng-transclude></p></div>'}}).directive("formitem",function(){return{restrict:"E",replace:!0,transclude:!0,scope:{title:"@",name:"@",value:"@",icon:"@",type:"@",model:"@",help:"@",placeholder:"@"},link:function(a,b,c){b.find("input").addClass("form-control")},template:'<fieldset class="form-group row"><div class="control-label col-sm-3 col-xs-3"><label for="{{name}}">{{title}} </label></div><div class="col-sm-9 col-xs-9" ng-transclude></div></fieldset>'}}).directive("moduleForm",function(){return{restrict:"E",transclude:!0,scope:{title:"@title",name:"@name",value:"@value",icon:"@icon",type:"@type",model:"@model",help:"@help",placeholder:"@placeholder"},template:'<div class="control-group"><div class="control-label"><label for="{{name}}">{{title}} </label></div><div class="controls" ng-transclude></div></div>'}}).directive("featureRow",function(){return{restrict:"E",replace:!0,transclude:!0,scope:{title:"@",href:"@",image:"@",icon:"@",body:"@"},template:'<div class="masthead  row-fluid feature-row"><div class="span8"><h2>{{title}}</h2><p>{{body}}</p><div class="feature-content" ng-transclude></div></div><div class="span4"><img ng-src="{{image}}" alt="{{title}}" style="height:200px; width:320px;" class="feature-image"/></div></div>'}}).directive("blankslate",function(){return{restrict:"E",replace:!0,transclude:!0,scope:{title:"@",modal:"@",href:"@",image:"@",icon:"@",body:"@"},template:'<div class="well blank-slate"><p>{{body}}</p><a class="btn btn-primary" data-toggle="modal" href="#{{modal}}"><i class="icon-plus icon-white"></i> {{title}}</a></div>'}}).directive("portlet",function(){return{restrict:"E",replace:!0,transclude:!0,scope:"isolate",locals:{title:"bind"},template:'<div class="box" id="box-"><h4 class="box-header round-top">{{title}}<a class="box-btn" title="close"><i class="icon-remove"></i></a><a class="box-btn" title="toggle"><i class="icon-minus"></i></a><a class="box-btn" title="config" data-toggle="modal" href="#box-config-modal"><i class="icon-cog"></i></a></h4><div class="box-container-toggle"><div class="box-content" ng-transclude></div></div></div>'}}),jpsPassbookManagerApp.directive("thumbox",function(){return{restrict:"E",transclude:!0,scope:{},locals:{title:"bind"},template:' <ul class="thumbnails wizard-themes"><li id="{{theme.slug}}" class="span3 wizard-theme" ng-model="smartapp.theme" ng-repeat="theme in wizard.themes"><a class="thumbnail" ng-click="themeClick()" ng-model="smartapp.theme"> <img ng-src="{{theme.image}}" alt="{{theme.title}} Image"/><div class="category"><i class="icon-home icon-white"></i><span>{{theme.title}}</span></div><div class="caption"><div class="title"><p class="banner" style="display: none;"><span>SELECTED</span></p></div><p>{{theme.body}}</p><input type="checkbox" name="data[Smartapp][theme]" value="{{theme.id}}" class="theme-radio" ng-change="themeClick()" ng-model="smartapp.theme"/></div> </a></li></ul>'}}).directive("widget",function(){return{restrict:"E",replace:!0,transclude:!0,scope:{title:"@title",icon:"@icon",collapsed:"@collapsed"},template:'<div class="portlet opened"><h4 class="portlet-header ui-widget-header ui-corner-all"><i class="icon-{{icon}}"></i> {{title}}<span class="ui-icon toggle-icon ui-icon-plusthick"></span></h4><section class="portlet-container-toggle"><div class="portlet-content" ng-transclude></div></section></div>',link:function(a,b,c){function d(){f=!f,b.removeClass(f?"closed":"opened"),b.addClass(f?"opened":"closed"),b.find(".toggle-icon").addClass(f?"ui-icon-minusthick":"ui-icon-plusthick"),b.find(".toggle-icon").removeClass(f?"ui-icon-plusthick":"ui-icon-minusthick")}var e=angular.element(b.find("h4")),f=!1;e.bind("click",d),d()}}}).directive("uploader",function(){return{restrict:"A",replace:!0,transclude:!0,scope:{title:"@title",icon:"@icon",collapsed:"@collapsed"},template:'<div class="ame-uploader"><div ng-transclude>[AME File Uploader]</div><input name="data[image]" id="ame-uploader-input" value="" type="file" class="file-url-input ame-uploader"><div id="ame-uploader-div" class="upload-image-wrap drop-zone"><img id="ame-uploader-image" alt=" Image" src="http://placehold.it/250x250&text=Drop Image Here" ng-src="file.url"/></div></div>',link:function(a,b,c){$("#ame-uploader-input").live("change",function(a){var b=a.currentTarget.files;$rootScope.App.API.uploadFile(b[0],$rootScope.App.session.appid,function(a){var b=window.location.origin+"/files/uploads/"+$rootScope.App.session.appid+"/"+a.results.file.name;$rootScope.Products.selectedProduct.Product.image=b,$("#product_image").attr("src",b)});for(var c,d=0;c=b[d];d++)if(c.type.match("image.*")){var e=new FileReader;e.onload=function(a){return function(b){var c=document.createElement("span");c.innerHTML=['<img class="thumb" src="',b.target.result,'" title="',escape(a.name),'"/>'].join(""),$("#ame-uploader-div").html(c)}}(c),e.readAsDataURL(c)}})}}}),jpsPassbookManagerApp.directive("amMobileNavbar",function(){return{restrict:"A",transclude:!0,scope:"isolate",locals:{title:"bind"},template:'<div class="ame-fileuploader"><div ng-transclude>[amMobileNavbar]</div></div>'}}),angular.module("filters",[]).filter("truncate",function(){return function(a,b,c){return a||(a=""),a=String(a),isNaN(b)&&(b=10),void 0===c&&(c="..."),a.length?a.length<=b||a.length-c.length<=b?a:String(a).substring(0,b-c.length)+c:void 0}}),angular.module("jcfTree.directive",[]).directive("treeElement",["$compile",function(a){return{restrict:"E",link:function(b,c,d){b.tree=b.node;var e="collapse"!=d.nodeState||'style="display: none;"';if(b.tree.children.length){console.log(b.tree.children);for(var f in b.tree.children)b.tree.children[f].children.length?b.tree.children[f].className="jcf_"+d.nodeState+" jcf_deselected":b.tree.children[f].className="jcf_child jcf_deselected";var g=angular.element("<ul "+e+'><li ng-repeat="node in tree.children" node-id={{node.'+d.nodeId+'}} ng-class="node.className">{{node.'+d.nodeName+'}}<tree-element tree="node" node-id='+d.nodeId+" node-name="+d.nodeName+" node-state="+d.nodeState+"></tree-element></li></ul>"),h=a(g);h(b),c.replaceWith(g)}else c.remove()}}}]).directive("jcfTree",["$compile",function(a){return{restrict:"E",link:function(b,c,d){b.selectedNode=null;var e=document.createElement("style");e.innerHTML="jcf-tree ul{margin:0;padding:0;list-style:none;border:none;overflow:hidden;text-decoration:none;color:#555}jcf-tree li{position:relative;padding:0 0 0 20px;font-size:13px;font-weight:initial;line-height:18px;cursor:pointer}jcf-tree .jcf_expand{background:url("+d.expandIcon+") no-repeat}jcf-tree .jcf_collapse{background:url("+d.collapseIcon+") no-repeat}jcf-tree .jcf_child{background:url("+d.childIcon+") no-repeat}jcf-tree .jcf_selected{font-weight:bold;}jcf-tree .hide{display:none;}jcf-tree .jcf_deselected{font-weight:normal;}",document.body.appendChild(e),b.$watch(d.treeData,function(e){console.log(b[d.treeData]);for(var f in b[d.treeData])b[d.treeData][f].children.length?b[d.treeData][f].className="jcf_"+d.nodeState+" jcf_deselected":b[d.treeData][f].className="jcf_child jcf_deselected";var g=angular.element('<ul id="jcfTreeBrowser" class="filetree treeview-famfamfam treeview"><li ng-repeat="node in '+d.treeData+'" node-id={{node.'+d.nodeId+'}} ng-class="node.className">{{node.'+d.nodeName+'}}<tree-element tree="node" node-id='+d.nodeId+" node-name="+d.nodeName+" node-state="+d.nodeState+"></tree-element></li></ul>");a(g);ljpsPassbookManagerAppinkFunction(b),c.html(null).append(g),angular.element(document.getElementById("jcfTreeBrowser")).unbind().bind("click",function(a){console.log(a.target),angular.element(a.target).length&&(b.previousElement=b.currentElement,b.currentElement=angular.element(a.target),console.log(b.currentElement),b.$broadcast("nodeSelected",{selectedNode:b.currentElement.attr("node-id")}),b.previousElement&&b.previousElement.addClass("jcf_deselected").removeClass("jcf_selected"),b.currentElement.addClass("jcf_selected").removeClass("jcf_deselected"),b.currentElement.children().length&&(b.currentElement.children().toggleClass("hide"),b.currentElement.toggleClass("jcf_collapse"),b.currentElement.toggleClass("jcf_expand")))})},!0)}}}]),jpsPassbookManagerApp.controller("MainCtrl",function(a,b){}),jpsPassbookManagerApp.controller("DetailCtrl",function(a,b,c,d,e,f){a.pass=f;var g=e;$(document).ready(function(){$(".datepicker").datepicker(),$(".timepicker").timepicker(),$(".colorpicker").colorpicker(),$("#pass-qrcode").empty().qrcode({width:200,height:200,text:f.webServiceURL+"/v1/export/"+f._id})}),a.loadSchema=function(){console.log(a.pass.type),d.get("/passes/schemas/"+a.pass.type+".json").success(function(b){a.pass=b,console.log("loadSchema",a.pass.type,b)})},a.barcodes=[{name:"QR Barcode",selected:!0,value:"PKBarcodeFormatQR"}],a.updateQrcode=function(a){angular.element("#pass-qrcode").empty().qrcode(a.barcode.message)},a.savePass=function(c){c=c||{},console.log("savePass",c),c._id?g.put(c).then(function(c){console.log("response",c),a.pass=c.data,b.path("/passes")})["catch"](function(a){console.error("savePass",a)}):g.post(c).then(function(a){console.log("createPass",a),b.path("/passes")})["catch"](function(a){console.error("db.post",a),alert("Error while creating pass")})}}),jpsPassbookManagerApp.controller("ManageCtrl",function(a,b,c,d){function e(a){console.warn("Sending",a);var b=new XMLHttpRequest,c=new FormData;c.append("passphrase",a.passphrase),c.append("file",a.file),b.addEventListener("readystatechange",function(){4===this.readyState&&console.log("readystatechange",this.readyState,this.responseText)}),b.open("POST","/api/v1/admin/passes/passTypeIdentifier/"+a.passTypeIdentifier),b.send(c)}function f(b){console.warn("file changed",b);var c,d=0,e=b.target.files,f=e.length;for(d;f>d;d++)c=e[d],console.warn("processing",c),a.formData.file=c}a.user=c,a.passTypeIdentifiers=c.passTypeIdentifiers,a.formData={},$("input[type=file]").bind("change",function(a){f(a)}),a.handleFormSubmit=function(b){console.log("Send form data",b),a.formData.passphrase=b.passphrase,a.formData.passTypeIdentifier=b.passTypeIdentifier,e(a.formData)}}),angular.module("jpsPassbookManagerApp").controller("PassesCtrl",["$scope","passes","Api","$rootScope","$http","$document","$compile","$route","$routeParams","$location",function(a,b,c,d,e,f,g,h,i,j){a.name="SmartPassCtrl",a.passes=b,a.$route=h,a.$location=j,a.$routeParams=i,a.cdn="http://1ff1217913c5a6afc4c8-79dc9bd5ca0b6e6cb6f16ffd7b1e05e2.r26.cf1.rackcdn.com",a.searchFilter="";var k=c;a.tabs=[{id:"passes",title:"Passes"},{id:"registrations",title:"Registrations"},{id:"logs",title:"Logs"}],a.selectTab=function(b){a.tabs.forEach(function(a){a.active=!1}),b.active=!b.active},a.passTypes=[{name:"generic",title:"Generic"},{name:"boardingPass",title:"Boarding Pass"},{name:"coupon",title:"Coupon"},{name:"eventTicket",title:"Event Ticket"},{name:"storeCard",title:"Store Card"}],window.SmartApp=a.SmartPass={api:{url:location.protocol+"//"+location.hostname+":"+location.port+"/api/v1"},types:[{name:"generic",title:"Generic"},{name:"boardingPass",title:"Boarding Pass"},{name:"coupon",title:"Coupon"},{name:"eventTicket",title:"Event Ticket"},{name:"storeCard",title:"Store Card"}],passes:[],pass:null,barcodes:[{name:"QR Barcode",value:"PKBarcodeFormatQR"},{name:"PDF Barcode",value:"PKBarcodeFormatPDF417"},{name:"Aztec Barcode",value:"PKBarcodeFormatAztec"}],init:function(){},loadSchema:function(){console.log(a.pass.type),e.get("/passes/schemas/"+a.pass.type+".json").success(function(b){a.pass=b,console.log("loadSchema",a.pass.type,b)})},selectPass:function(b){a.SmartPass.pass=b,a.pass=b,console.log("selectPass",b)},clearPass:function(){a.SmartPass.pass=null,a.SmartPass.pass=angular.copy(a.SmartPass.coupon),a.pass=null,console.log("clearPass",this)},deletePass:function(b){a.SmartPass.pass=b,a.pass=b,console.log("deletePass",b),k.remove(b._id).then(function(c){angular.element(b._id).remove(),a.SmartPass.getPasses(),console.log("deletePass",c)})["catch"](function(a){console.error(a)})},getPasses:function(){var b={include_docs:!0};k.allDocs(b).then(function(b){console.log("getPasses",b),b&&b.data&&d.safeApply(function(){a.SmartPass.passes=b.data.rows||b.data})})},savePass:function(b){b=b||{},console.log("savePass",b),b._id?k.put(b).then(function(b){console.log("response",b),b&&(a.SmartPass.pass=null,a.SmartPass.getPasses(),a.SmartPass.clearPass())})["catch"](function(a){console.error("savePass",a)}):k.post(b).then(function(b){b&&(a.SmartPass.pass=b,a.SmartPass.getPasses()),console.log("createPass",b)})},packagePass:function(a){console.log("packagePass",a)},exportPass:function(b){console.log("exportPass",b),a.SmartPass.pass=b,e.get("/api/v1/export/"+b._id).success(function(c){console.log("export result",c),a.SmartPass.signPass(b,c.filename)})},signPass:function(b,c){var d="/api/v1/sign/"+b._id+"?path="+c;a.SmartPass.pass.url=d,window.open(d),console.log("signPass",c)},updatedQrcode:function(a){angular.element("#pass-qrcode").empty().qrcode(a.barcode.message)},add:function(){this.pass=a.SmartPass.storeCard}},a.SmartPass.coupon={mode:"edit",formatVersion:1,passTypeIdentifier:"pass.passbookmanager.io",serialNumber:"E5982H-I2",teamIdentifier:"USE9YUYDFH",webServiceURL:"http://"+location.hostname+":"+location.port+"/smartpass/v1",authenticationToken:"000000000012341234",barcode:{message:"123456789",format:"PKBarcodeFormatQR",messageEncoding:"iso-8859-1"},locations:[{longitude:-122.3748889,latitude:37.6189722}],organizationName:" Coupon",logoText:"Logo",description:"20% off any products",foregroundColor:"#111",backgroundColor:"#222",coupon:{primaryFields:[{key:"offer",label:"Any premium dog food",value:"20% off"}],auxiliaryFields:[{key:"starts",label:"STARTS",value:"Feb 5, 2013"},{key:"expires",label:"EXPIRES",value:"March 5, 2012"}],backFields:[{key:"terms",label:"TERMS AND CONDITIONS",value:'Generico offers this pass, including all information, software, products and services available from this pass or offered as part of or in conjunction with this pass (the "pass"), to you, the user, conditioned upon your acceptance of all of the terms, conditions, policies and notices stated here. Generico reserves the right to make changes to these Terms and Conditions immediately by posting the changed Terms and Conditions in this location.\n\nUse the pass at your own risk. This pass is provided to you "as is," without warranty of any kind either express or implied. Neither Generico nor its employees, agents, third-party information providers, merchants, licensors or the like warrant that the pass or its operation will be accurate, reliable, uninterrupted or error-free. No agent or representative has the authority to create any warranty regarding the pass on behalf of Generico. Generico reserves the right to change or discontinue at any time any aspect or feature of the pass.'}]}},a.pass={},a.order="lastUpdated",a.reverse=!1,a.toggle=function(a){console.log(a),$(a.target).next().slideToggle()},console.warn("passes ctrl",a)}]),jpsPassbookManagerApp.controller("DocsCtrl",function(a,b,c){c.get("/README.md").success(function(a){angular.element("#docs").html(markdown.toHTML(a))})}),jpsPassbookManagerApp.controller("ServerCtrl",function(a,b,c,d,e){a.logs=b,a.registrations=d,a.devices=c,a.order="created_at",a.sort=!0}),angular.module("jpsPassbookManagerApp").factory("Api",["$http",function(a){var b=function(b){return console.log("INFO","request",b),a(b)};return{request:b,allDocs:function(a){return b({method:"GET",params:a,url:"/api/v1/admin/passes"})},get:function(a){return b({method:"GET",url:"/api/v1/admin/passes/"+a})},put:function(a){return b({method:"PUT",data:a,url:"/api/v1/admin/passes/"+a._id})},remove:function(a){return b({method:"DELETE",url:"/api/v1/admin/passes/"+a})},post:function(a){return b({method:"POST",data:a,url:"/api/v1/admin/passes"})}}}]);