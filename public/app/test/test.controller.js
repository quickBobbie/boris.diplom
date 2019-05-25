angular.module('boris').controller('testController', [
    '$scope',
    '$rootScope',
    '$http',
    '$location',
    '$routeParams',
    function (scope, rootScope, http, $location, $routeParams) {
        scope.test = {};
        scope.isLoading = false;

        const getTest = () => {
            scope.isLoading = true;
            let url = [rootScope.API_URL, 'test', $routeParams.testId].join('/');
            url = `${url}?access_token=${rootScope.isLogin}`;

            http.get(url)
                .then(res => {
                    scope.isLoading = false;
                    if (res.data && res.data.test) {
                        scope.test = angular.copy(res.data.test);
                    }
                })
                .catch(err => {
                    scope.isLoading = false;
                    alert(err.statusText);
                    $location.back();
                })
        };

        scope.startTest = () => {
            let questions = new Set(scope.test.questions);
            localStorage.setItem("questions", JSON.stringify(Array.from(questions)));
        };

        getTest()
    }
]);