app.controller("indexController",function($scope,indexService){
	 $scope.showName=function () {
         indexService.showName2().success(function (response) {
             $scope.username= response.name ;
         })
     }
})