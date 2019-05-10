angular.module('boris').controller('testListController', [
    '$scope',
    '$http',
    '$rootScope',
    'notify',
    function(scope, http, rootScope, notify) {
        scope.testList = [];
        scope.search = "";
        scope.isLoading = false;

        scope.getTestList = () => {
            scope.isLoading = true;
            let url = [rootScope.API_URL, 'test'].join('/');
            url = `${url}?access_token=${localStorage.getItem('access_token')}&search=${scope.search}`;

            http.get(url)
                .then(res => {
                    let data = res.data || null;
                    if (data && data.tests && data.tests.length) {
                        scope.testList = angular.copy(data.tests);
                        console.log(scope.testList)
                    }
                    scope.isLoading = false;
                })
                .catch(err => {
                    if (err.status === 404) {
                        scope.testList = [];
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
                scope.getTestList();
            }, 1000);
        });

        scope.getTestList();
    }
]);