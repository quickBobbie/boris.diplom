angular.module('boris').controller('loginController', [
    '$scope',
    '$http',
    '$rootScope',
    '$location',
    function (scope, http, rootScope, $location) {
        scope.form = {
            login: {
                value: ""
            },
            password: {
                value: ""
            }
        };

        scope.submit = () => {
            let data = {};
            for (let key in scope.form) {
                if (scope.form[key].value.length < 3) {
                    return;
                }
                data[key] = scope.form[key].value;
            }
            let url = [rootScope.API_URL, "user", "signin"].join("/");
            http.post(url, data, rootScope.config)
                .then(res => {
                    let data = res.data;
                    if (data && data.token) {
                        localStorage.setItem("access_token", data.token);
                        rootScope.isLogin = localStorage.getItem("access_token");
                        $location.path('/testlist')
                    }
                })
                .catch(err => {
                    alert(err.statusText)
                })
        }
    }
]);