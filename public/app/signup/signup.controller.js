angular.module('boris').controller('signupController', [
    '$scope',
    '$rootScope',
    '$http',
    '$location',
    function(scope, rootScope, http, $location) {
        scope.form = {
            login: {
                value: "",
                required: true
            },
            password_1: {
                value: "",
                required: true
            },
            password_2: {
                value: "",
                required: true
            },
            firstname: {
                value: "",
                required: false
            },
            lastname: {
                value: "",
                required: false
            }
        };

        scope.submit = () => {
            let data = {};
            for (let key in scope.form) {
                let item = scope.form[key];
                if (item.value.length >= 3) {
                    data[key] = item.value;
                } else if (item.required) {
                    alert("No field.");
                    return;
                }
            }
            if (data.password_1 !== data.password_2) {
                alert("Passwords do not match.");
                return;
            }
            let url = [rootScope.API_URL, 'user', 'signup'].join('/');
            http.post(url, data, rootScope.headers)
                .then(res => {
                    let data = res.data;
                    if (data && data.token) {
                        localStorage.setItem("access_token", data.token);
                        rootScope.isLogin = localStorage.getItem("access_token");
                        $location.path("/testlist")
                    }
                })
                .catch(err => {
                    alert(err.statusText);
                });
        }
    }
]);