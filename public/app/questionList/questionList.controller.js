angular.module('boris').controller('questionListController', [
    '$scope',
    '$http',
    '$rootScope',
    '$mdDialog',
    '$routeParams',
    function (scope, http, rootScope, $mdDialog, $routeParams) {
        scope.questions = [];

        scope.data = {
            title: "",
            total: 1
        };

        scope.isLoading = true;

        let selected = null;

        scope.submit = () => {
            if (!scope.data.title) {
                return;
            }

            let url = [rootScope.API_URL, 'test', $routeParams.testId, 'question', 'create'].join('/');
            url = `${url}?access_token=${localStorage.getItem('access_token')}`;

            http.post(url, scope.data)
                .then(res => {
                    if (res.status && res.status === 201) {
                        alert("Created");
                        scope.questions.push(angular.copy(res.data.question));
                        scope.data.title = "";
                        scope.data.total = 1;
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        };

        scope.showAddForm = (index) => {
            $mdDialog.show({
                    parent: angular.element(document.querySelector('body')),
                    controller: answerModalController,
                    templateUrl: './app/answerModal/answerModal.template.html',
                    clickOutsideToClose: true
                })
                .then(function(answer) {
                    selected = index;
                    createAnswer(answer)
                }, function() {

                });
        };

        const createAnswer = (answer) => {
            if (!answer) {
                return;
            }
            if (scope.questions.length
                && scope.questions[selected]
                && scope.questions[selected].answers.length
            ) {
                for (let item of scope.questions[selected].answers) {
                    if (item.isValid) {
                        answer.isValid = false;
                    }
                }
            }

            let url = [rootScope.API_URL, 'test', $routeParams.testId, 'question', scope.questions[selected]._id, 'answer', 'create'].join('/');
            url = `${url}?access_token=${localStorage.getItem('access_token')}`;

            http.post(url, answer)
                .then(res => {
                    if (res.status && res.status === 201) {
                        alert("Created");
                        scope.questions[selected].answers.push(res.data.answer);
                    }
                })
                .catch(err => {
                    alert(err.statusText);
                })
        };

        const getQuestions = () => {
            let url = [rootScope.API_URL, 'test', $routeParams.testId, 'question'].join('/');
            url = `${url}?access_token=${localStorage.getItem('access_token')}`;

            http.get(url)
                .then(res => {
                    if (res.status && res.status === 200) {
                        scope.questions = angular.copy(res.data.questions)
                    }
                    scope.isLoading = false;
                })
                .catch(err => {
                    alert(err.statusText);
                    scope.isLoading = false;
                })
        };

        getQuestions();
    }
]);