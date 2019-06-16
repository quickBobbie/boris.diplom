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
            .when('/profile', {
                templateUrl: './app/profile/profile.template.html',
                controller: 'profileController',
                authorized: true
            })
            .when('/analytic', {
                templateUrl: './app/analytic/analytic.template.html',
                controller: 'analyticController',
                authorized: true
            })
            .when('/material', {
                templateUrl: './app/material/material.template.html',
                controller: 'materialController',
                authorized: true
            })
            .when('/analytic/:analyticId', {
                templateUrl: './app/analyticFull/analyticFull.template.html',
                controller: 'analyticFullController',
                authorized: true
            })
            .when('/test/:testId', {
                templateUrl: './app/test/test.template.html',
                controller: 'testController',
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
            .when('/test/:testId/question', {
                templateUrl: './app/question/question.template.html',
                controller: 'questionController',
                authorized: true
            })
            .otherwise('/login');
    }
]).run(function ($rootScope, $location) {
    $rootScope.$on('$routeChangeStart', function ($event, next) {
        let token = localStorage.getItem('access_token');

        if (!token && next.$$route && next.$$route.authorized) {
            localStorage.clear();
            $rootScope.isLogin = false;
            $rootScope.isTeacher = false;
            $location.path('/login');
        }
        if (token && next.$$route && !next.$$route.authorized) {
            $location.path('/testlist')
        }
    })
});