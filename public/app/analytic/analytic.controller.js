angular.module('boris').controller('analyticController', [
    '$scope',
    '$rootScope',
    '$http',
    '$location',
    function (scope, rootScope, http, $location) {
        scope.analticList = [];
        scope.search = "";
        scope.isLoading = false;

        scope.getAnalyticList = () => {
            scope.isLoading = true;
            let url = [rootScope.API_URL, 'analytic'].join('/');
            url = `${url}?access_token=${localStorage.getItem('access_token')}&search=${scope.search}`;

            http.get(url)
                .then(res => {
                    let data = res.data || null;
                    if (data && data.tests && data.tests.length) {
                        scope.analticList = angular.copy(data.tests);
                    }
                    scope.isLoading = false;
                })
                .catch(err => {
                    if (err.status === 404) {
                        scope.analticList = [];
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