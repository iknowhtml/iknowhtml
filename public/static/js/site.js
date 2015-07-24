var app = angular.module("siteApp", ['parallax']);

app.controller('navCtrl', ['$scope', function($scope){
	$scope.showMobileMenu = false;
	$scope.toggleMobileMenu = function(){
		console.log($scope.showMobileMenu)
		$scope.showMobileMenu = !$scope.showMobileMenu;
	}
}]);