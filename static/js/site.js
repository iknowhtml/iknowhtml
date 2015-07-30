/*global $ */
var app = angular.module("siteApp", ['parallax']);

app.controller('navCtrl', ['$scope', function($scope){
	$scope.showMobileMenu = false;
	$scope.toggleMobileMenu = function(){
		console.log($scope.showMobileMenu)
		$scope.showMobileMenu = !$scope.showMobileMenu;
	}
}]);

app.controller('introCtrl', ['$scope', function($scope){
	$(document).ready(function(){
		resizeDiv();
	});

	window.onresize = function(event) {
		resizeDiv();
	}

	function resizeDiv() {
		var win_height = $(window).height() < 960 ? $(window).height() : 960;	
		var height = 0.85 * win_height;
		var top = 0.00027 * Math.pow(height,2);
		var size = 0.15 * win_height;

		$('#intro').css('height', height+ 'px');

		$('.introduction-header').css('top', top + 'px');	

		$('.introduction-header-main').css('font-size', size + 'px');

	}
}]);