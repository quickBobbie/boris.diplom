angular.module('boris').controller('analyticFullController', [
    '$scope',
    '$rootScope',
    '$http',
    '$location',
    '$routeParams',
    function (scope, rootScope, http, $location, $routeParams) {
        scope.analytic = {};
        scope.isLoading = false;

        scope.getDate = (date) => {
            date = new Date(date);
            date = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes()];

            for (let index in date) {
                if (String(date[index]).length < 2) {
                    date[index] = "0" + date[index];
                }
            }

            return `${date[0]}-${date[1]}-${date[2]} ${date[3]}:${date[4]}`;
        };


        const getAnalytic = () => {
            scope.isLoading = true;
            let url = [rootScope.API_URL, 'analytic', $routeParams.analyticId].join('/');
            url = `${url}?access_token=${rootScope.isLogin}`;

            http.get(url)
                .then(res => {
                    scope.isLoading = false;
                    if (res.data && res.data.analytic) {
                        scope.analytic = angular.copy(rootScope.chechPoints(res.data.analytic));
                        if (!rootScope.isTeacher && rootScope.uid !== scope.analytic.user._id) {
                            $location.path('/testlist');
                        }
                    }
                })
                .catch(err => {
                    scope.isLoading = false;
                    alert(err.statusText);
                    $location.path("/analytic")
                })
        };

        getAnalytic()
    }
]);