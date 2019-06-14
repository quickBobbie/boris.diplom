angular.module('boris').controller('analyticController', [
    '$scope',
    '$rootScope',
    '$http',
    '$location',
    function (scope, rootScope, http, $location) {
        scope.analyticList = [];
        scope.search = "";
        scope.isLoading = false;

        if (!rootScope.isTeacher) {
            return $location.path('/testlist');
        }

        scope.getAnalyticList = () => {
            scope.isLoading = true;
            let url = [rootScope.API_URL, 'analytic'].join('/');
            url = `${url}?access_token=${localStorage.getItem('access_token')}&search=${scope.search}`;

            http.get(url)
                .then(res => {
                    let data = res.data || null;
                    if (data && data.analytics && data.analytics.length) {
                        for (let analytic of data.analytics) {
                            scope.analyticList.push(rootScope.checkPoints(analytic))
                        }
                    }
                    scope.isLoading = false;
                })
                .catch(err => {
                    if (err.status === 404) {
                        scope.analyticList = [];
                    }
                    scope.isLoading = false;
                })
        };

        let timeId = false;

        scope.$watch('search', () => {
            if (timeId) {
                clearTimeout(timeId);
            }
            timeId = setTimeout(() => {
                scope.getAnalyticList();
            }, 1000);
        });
    }
]);