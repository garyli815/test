app.controller("goodsEditController",function($scope,uploadService,goodsService,itemCatService,typeTemplateService){

    $scope.entity={tbGoods:{},tbGoodsDesc:{itemImages:[]}};

	$scope.findCategory1List=function(){
        itemCatService.findByParentId(0).success(function (response) {
            $scope.category1List=response;
        })
	}

	// 监测一级分类数据的变化 可以获取二级分类数据
	$scope.$watch("entity.tbGoods.category1Id",function (newValue,oldValue) {
        itemCatService.findByParentId(newValue).success(function (response) {
            $scope.category2List=response;

            $scope.category3List=null;
            $scope.entity.tbGoods.category3Id=null;
            $scope.entity.tbGoods.typeTemplateId=null;
            $scope.entity.tbGoods.brandId=null;
            $scope.brandList=null;
        })
    })

    //  监测二级分类数据的变化   可以获取三级分类数据
    $scope.$watch("entity.tbGoods.category2Id",function (newValue,oldValue) {
        itemCatService.findByParentId(newValue).success(function (response) {
            $scope.category3List=response;

            $scope.entity.tbGoods.category3Id=null;
            $scope.entity.tbGoods.typeTemplateId=null;
            $scope.entity.tbGoods.brandId=null;
            $scope.brandList=null;
        })
    })
    //  监测三级分类数据的变化 newValue：三级分类id   可以获取模板
    $scope.$watch("entity.tbGoods.category3Id",function (newValue,oldValue) {
        itemCatService.findOne(newValue).success(function (response) {
            // response：三级分类对象
           $scope.entity.tbGoods.typeTemplateId=response.typeId
        })
    })
    //  监测模板id数据的变化 通过id 获取模板对象 从模板对象中获取品牌、规格、扩展属性
    $scope.$watch("entity.tbGoods.typeTemplateId",function (newValue,oldValue) {
        typeTemplateService.findOne(newValue).success(function (response) {
            // response:模板对象
           $scope.brandList =JSON.parse(response.brandIds); //  [{"id":27,"text":"富光"},{"id":28,"text":"希乐"}]
        })
    })

    //清空富文本编辑器中的值
    $scope.clearIntroduction=function () {
        editor.html("");
    }
    
    $scope.save=function () {
        // 把富文本编辑器中值赋给$scope.entity.tbGoodsDesc.introduction
        // editor.html() 取值
        $scope.entity.tbGoodsDesc.introduction=editor.html();
	    // alert(  editor.html());
    }

    //上传文件
    $scope.uploadFile=function () {
        uploadService.uploadFile().success(function (response) {
            if(response.success){
                $scope.image.url = response.message;
            }
        })
    }

    // 动态添加行
    $scope.addItemImage=function () {
        // 向$scope.entity.tbGoodsDesc.itemImages追加对象$scope.image
        $scope.entity.tbGoodsDesc.itemImages.push($scope.image);

    }
    // 动态添加删除行
    $scope.deleItemImages=function (index) {
        // 向$scope.entity.tbGoodsDesc.itemImages追加对象$scope.image
        $scope.entity.tbGoodsDesc.itemImages.splice(index,1);

    }

})