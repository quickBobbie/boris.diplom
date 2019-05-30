angular.module('boris').controller("appController", [
    '$rootScope',
    '$location',
    '$http',
    function ($rootScope, $location, $http) {
        $rootScope.isLogin = localStorage.getItem('access_token');
        $rootScope.uid = localStorage.getItem('uid');
        $rootScope.API_URL = "http://localhost:3000";
        $rootScope.profileTitle = "Profile";
        $rootScope.isTeacher = false;
        $rootScope.config = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        $rootScope.logout = () => {
            localStorage.clear();
            $rootScope.isLogin = false;
            $location.path('/');
        };

        $rootScope.$watch('isLogin', () => {
            if ($rootScope.isLogin) {
                $http.get([$rootScope.API_URL, 'user'].join('/') + '?access_token=' + $rootScope.isLogin)
                    .then(res => {
                        if (res.data && res.data.user) {
                            let user = res.data.user;
                            localStorage.setItem("login", user.login);
                            localStorage.setItem("firstname", user.firstname);
                            localStorage.setItem("lastname", user.lastname);
                            localStorage.setItem("uid", user._id);
                            $rootScope.profileTitle = user.lastname + " " + user.firstname;
                            $rootScope.isTeacher = angular.copy(user.isTeacher);
                        }
                    })
                    .catch(err => {
                        $rootScope.logout();
                    })
            }
        })
    }
]);