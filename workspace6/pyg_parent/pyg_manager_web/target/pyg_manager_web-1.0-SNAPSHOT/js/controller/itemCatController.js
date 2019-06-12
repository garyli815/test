 //控制层 
app.controller('itemCatController' ,function($scope,typeTemplateService ,itemCatService){	
	
	$scope.grade=1;//显示的分类数据的级别 默认显示的第一级分类
	$scope.entity1= null;//   代表的时面包屑上显示的一级分类对象
	$scope.entity2= null;//   代表的时面包屑上显示的二级分类对象
	
	$scope.parentId=0;  //表示即将保存的对象的父id
	
	$scope.setGrade=function(grade,pojo){
		$scope.grade = grade;
		if(grade==1){
			$scope.parentId=0;
			$scope.entity1 = null;
			$scope.entity2 = null;  //当前显示的是二级分类数据，没有entity2
		}
		
		if(grade==2){
			$scope.parentId=pojo.id;
			$scope.entity1=pojo;
			$scope.entity2 = null;  //当前显示的是二级分类数据，没有entity2
		}
		if(grade==3){
			$scope.parentId=pojo.id;
			$scope.entity2=pojo;
		}
		
		
	}
	
	
	$scope.findTypeTemplateList=function(){
//		查询所有模板数据 
		typeTemplateService.findAll().success(function(response){
			$scope.typeTemplateList  = response;
		})
	}

	
	$scope.findByParentId=function(parentId){
		itemCatService.findByParentId(parentId).success(function(response){
			$scope.list = response;
		})
		
	}
	
    //读取列表数据绑定到表单中  
	$scope.findAll=function(){
		itemCatService.findAll().success(
			function(response){
				$scope.list=response;
			}			
		);
	}    
	
	//分页
	$scope.findPage=function(page,rows){			
		itemCatService.findPage(page,rows).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
	
	//查询实体 
	$scope.findOne=function(id){				
		itemCatService.findOne(id).success(
			function(response){
				$scope.entity= response;					
			}
		);				
	}
	
	//保存 
	$scope.save=function(){		
//		保存或修改时需要对entity的parentId赋值
		var serviceObject;//服务层对象
        // entity name 和typeId
        //$scope.entity.parentId=$scope.parentId;  追加属性并且赋值
         $scope.entity['parentId']=$scope.parentId;  //追加属性并且赋值

		if($scope.entity.id!=null){//如果有ID
			serviceObject=itemCatService.update( $scope.entity ); //修改  
		}else{
			serviceObject=itemCatService.add( $scope.entity  );//增加 
		}				
		serviceObject.success(
			function(response){
				if(response.success){
					//重新查询 
//		        	$scope.reloadList();//重新加载
					$scope.findByParentId($scope.parentId);
				}else{
					alert(response.message);
				}
			}		
		);				
	}
	
	 
	//批量删除 
	$scope.dele=function(){			
		//获取选中的复选框			
		itemCatService.dele( $scope.selectIds ).success(
			function(response){
				if(response.success){
					$scope.reloadList();//刷新列表
				}						
			}		
		);				
	}
	
	$scope.searchEntity={};//定义搜索对象 
	
	//搜索
	$scope.search=function(page,rows){			
		itemCatService.search(page,rows,$scope.searchEntity).success(
			function(response){
				$scope.list=response.rows;	
				$scope.paginationConf.totalItems=response.total;//更新总记录数
			}			
		);
	}
    
});	
