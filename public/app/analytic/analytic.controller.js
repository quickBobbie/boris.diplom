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

        rootScope.chechPoints = (analytic) => {
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

        scope.getAnalyticList = () => {
            scope.isLoading = true;
            let url = [rootScope.API_URL, 'analytic'].join('/');
            url = `${url}?access_token=${localStorage.getItem('access_token')}&search=${scope.search}`;

            http.get(url)
                .then(res => {
                    let data = res.data || null;
                    if (data && data.analytics && data.analytics.length) {
                        for (let analytic of data.analytics) {
                            scope.analyticList.push(rootScope.chechPoints(analytic))
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