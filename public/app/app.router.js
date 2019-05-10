angular.module('boris').config([
    '$routeProvider',
    function ($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: './app/login/login.template.html',
                controller: 'loginController',
                authorized: false
            })
            .when('/signup', {
                templateUrl: './app/signup/signup.template.html',
                controller: 'signupController',
                authorized: false
            })
            .when('/testlist', {
                templateUrl: './app/testList/testList.template.html',
                controller: 'testListController',
                authorized: true
            })
            .when('/addtest', {
                templateUrl: './app/addTest/addTest.template.html',
                controller: 'addTestController',
                authorized: true
            })
            .when('/:testId/upload', {
                templateUrl: './app/uploadMaterial/uploadMaterial.template.html',
                controller: 'uploadMaterialController',
                authorized: true
            })
            .when('/:testId/questionlist', {
                templateUrl: './app/questionList/questionList.template.html',
                controller: 'questionListController',
                authorized: true
            })
            .otherwise('/login');
    }
]).run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function ($event, next) {
        let token = localStorage.getItem('access_token');

        if (!token && next.$$route && next.$$route.authorized) {
            $location.path('/login');
        }
        if (token && next.$$route && !next.$$route.authorized) {
            $location.path('/testlist')
        }
    })
});