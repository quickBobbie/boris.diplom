angular.module('boris').controller("appController", [
    '$rootScope',
    '$location',
    function ($rootScope, $location) {
        $rootScope.isLogin = localStorage.getItem('access_token');
        $rootScope.uid = localStorage.getItem('uid');
        $rootScope.API_URL = "http://localhost:3000";
        $rootScope.profileTitle = "Profile";
        $rootScope.config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        $rootScope.logout = () => {
            localStorage.clear();
            $rootScope.isLogin = false;
            $location.path('/');
        }
    }
]);