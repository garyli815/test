app.service("typeTemplateService",function($http){
	
	
	this.findAll=function(){
		return $http.get('../typeTemplate/findAll');	  // TODO测试数据
	}
	
	this.search=function(pageNum,pageSize,searchEntity){
		return $http.post("../typeTemplate/search?pageNum="+pageNum+"&pageSize="+pageSize,searchEntity);
	}
	
	this.add=function(entity){
		return $http.post("../typeTemplate/add",entity);
	}
	
	this.update=function(entity){
		return $http.post("../typeTemplate/update",entity);
	}
	
	
	this.findOne=function(id){
		return $http.get("../typeTemplate/findOne?id="+id);
	}

	this.dele=function(ids){
		return $http.get("../typeTemplate/delete?ids="+ids);
	}

})