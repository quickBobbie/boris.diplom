angular.module('boris').controller('questionController', [
    '$scope',
    '$rootScope',
    '$http',
    '$location',
    '$routeParams',
    function (scope, rootScope, http, $location, $routeParams) {
        scope.isLoading = false;
        scope.questions = [];
        scope.questionIndex = 0;
        scope.question = {};
        scope.selected = {
            answerId: ""
        };

        scope.getQuestion = () => {
            if (rootScope.isTeacher) {
                return $location.path('/testlist');
            }
            scope.isLoading = true;
            let url = [rootScope.API_URL, 'test', $routeParams.testId, 'question', scope.questions[scope.questionIndex]].join('/');
            url = `${url}?access_token=${rootScope.isLogin}`;

            http.get(url)
                .then(res => {
                    scope.isLoading = false;
                    if (res.data && res.data.question) {
                        scope.question = angular.copy(res.data.question);
                    }
                })
                .catch(err => {
                    scope.isLoading = false;
                    alert(err.statusText);
                    localStorage.removeItem("questions");
                    $location.back();
                })
        };

        scope.send = () => {
            let url = [rootScope.API_URL, 'analytic', 'send', localStorage.getItem("analytic")].join('/');
            url = `${url}?access_token=${rootScope.isLogin}`;

            http.put(url, scope.selected)
                .then(res => {
                    if (res.status && res.status === 200) {
                        scope.questionIndex++;
                        if (scope.questionIndex + 1 > scope.questions.length) {
                            $location.path("/analytic/" + localStorage.getItem("analytic"));
                            localStorage.removeItem("analytic");
                            localStorage.removeItem("questions");
                            localStorage.removeItem("questionIndex");
                        } else {
                            scope.getQuestion();
                        }
                    }
                })
                .catch(err => {
                    alert(err.statusText);
                })
        };

        const startAnalytic = () => {
            if (localStorage.getItem("analytic")) {
                if (!scope.questions.length) {
                    scope.questions = JSON.parse(localStorage.getItem("questions"));
                    scope.getQuestion();
                }
                return;
            }
            scope.isLoading = true;
            let url = [rootScope.API_URL, 'analytic', 'start', $routeParams.testId].join('/');
            url = `${url}?access_token=${rootScope.isLogin}`;

            http.get(url)
                .then(res => {
                    scope.isLoading = false;
                    if (res.data && res.data.analytic) {
                        localStorage.setItem("analytic", res.data.analytic._id);
                        localStorage.setItem("questionIndex", "0");
                        scope.questions = JSON.parse(localStorage.getItem("questions"));
                        scope.getQuestion();
                    }
                })
                .catch(err => {
                    scope.isLoading = false;
                    alert(err.statusText);
                    localStorage.removeItem("questions");
                    $location.back();
                })
        };

        startAnalytic();
    }
]);