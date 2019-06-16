angular.module('boris').controller("appController", [
    '$rootScope',
    '$location',
    '$http',
    function ($rootScope, $location, $http) {
        $rootScope.isLogin = localStorage.getItem('access_token');
        $rootScope.uid = localStorage.getItem('uid');
        $rootScope.API_URL = "http://92.53.124.167";
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
            $rootScope.isTeacher = false;
            $rootScope.uid = false;
            $location.path('/login');
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
        });

        $rootScope.checkPoints = (analytic) => {
            const pointList = [
                {
                    value: 2,
                    min: 0,
                    max: 39.99999
                },
                {
                    value: 3,
                    min: 40,
                    max: 59.99999
                },
                {
                    value: 4,
                    min: 60,
                    max: 84.99999
                },
                {
                    value: 5,
                    min: 85,
                    max: 100
                }
            ];

            analytic.percent = analytic.total * 100 / analytic.allTotal;
            if (analytic.percent !== Infinity) {
                analytic.percent = Math.round(analytic.percent * Math.pow(10, 1)) / Math.pow(10, 1);
                for (let item of pointList) {
                    if (analytic.percent >= item.min && analytic.percent <= item.max) {
                        analytic.points = item.value;
                    }
                }
            } else {
                analytic.points = "Ошибка посчета";
                analytic.points = "Ошибка посчета";
            }

            return analytic;
        };
    }
]);