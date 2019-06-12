app.service("indexService",function($http){
	
	this.showName=function(){
	  return $http.get("../index/showName");
	}
	this.showName2=function(){
	  return $http.get("../index/showName2");
	}

})