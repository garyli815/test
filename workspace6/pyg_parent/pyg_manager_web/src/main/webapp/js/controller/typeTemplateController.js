app.controller("typeTemplateController",function($scope,$controller,specificationService,brandService,typeTemplateService){
	
	$controller('baseController',{$scope:$scope});//继承
    $scope.searchEntity={};
	 $scope.search=function(pageNo,pageSize){
		 typeTemplateService.search(pageNo,pageSize,$scope.searchEntity).success(function(response){
			 $scope.paginationConf.totalItems = response.total;
			 $scope.list = response.rows;
		 })
	 }

	 // [{"id":27,"text":"富光"},{"id":28,"text":"希乐"}]---->富光,希乐
	 $scope.arrayToString=function (array) {

         array = JSON.parse(array);

		 var str="";
         for (var i = 0; i < array.length; i++) {
             if(i==(array.length-1)){
                 str+= array[i].text;
			 }else{
                 str+= array[i].text+",";
			 }
         }
	 	return str;
     }



    // 查询所有品牌数据
    $scope.findBrandList=function(){
	 	brandService.findBrandList().success(function (response) {
            // response格式要求：[{id:1,text:''},{id:2,text:''}]
            $scope.brandList={data:response};
        })
	};
	 // 查询所有规格数据
    $scope.findSpecList=function(){
        specificationService.findSpecList().success(function (response) {
            // response格式要求：[{id:1,text:''},{id:2,text:''}]
            $scope.specList={data:response};
        })
    };

    // 动态添加扩展属性行
    $scope.addCustomAttributeItems=function () {
		$scope.entity.customAttributeItems.push({});
    }
    // 动态删除扩展属性行
    $scope.deleCustomAttributeItems=function (index) {
		$scope.entity.customAttributeItems.splice(index,1);
    }
 // $scope.specList={data:[{"id":"26","text":"上衣尺码"},{"id":"27","text":"网络"},
		// 	 {"id":"28","text":"手机屏幕尺寸"},{"id":"32","text":"机身内存"}]};

	 
	 $scope.save=function(){
		 var obj=null;
		 if($scope.entity.id!=null){
			 obj = typeTemplateService.update($scope.entity) ;
		 }else{
			 obj = typeTemplateService.add($scope.entity) ;
		 }
		 obj.success(function(response){
			 if(response.success){
				 $scope.reloadList();
			 }else{
				 alert(response.message);
			 }
			 
		 })
	 }
	 

	 
	 $scope.findOne=function(id){
		 typeTemplateService.findOne(id).success(function(response){
		 	 response.brandIds = JSON.parse(response.brandIds);
			 response.specIds = JSON.parse(response.specIds);
			 response.customAttributeItems = JSON.parse(response.customAttributeItems);

			 $scope.entity = response;
		 })
	 }


    $scope.dele=function () {
        if($scope.selectIds.length==0){
            return;
        }
        var flag = window.confirm("确认删除您选择的数据吗?");
        if(flag){
            typeTemplateService.dele($scope.selectIds).success(function (response) {
                if(response.success){
                    $scope.reloadList();
                    $scope.selectIds=[];// 清空数组
                }else{
                    alert(response.message);
                }
            })
        }
    }
})