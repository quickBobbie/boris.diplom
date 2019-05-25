angular.module('boris').controller('profileController', [
    '$scope',
    '$rootScope',
    '$http',
    '$location',
    function (scope, rootScope, http, $location) {
        scope.user = {
            login: localStorage.getItem("login"),
            firstname: localStorage.getItem("firstname"),
            lastname: localStorage.getItem("lastname")
        };
        scope.data = {
            login: "",
            firstname: "",
            lastname: ""
        };
        scope.password = {
            oldpassword: "",
            password_1: "",
            password_2: ""
        };

        scope.updateInfo = () => {
            let url = [rootScope.API_URL, 'user', 'update'].join('/');
            url = `${url}?access_token=${localStorage.getItem('access_token')}`;

            http.put(url, scope.data)
                .then(res => {
                    if (res.status && res.status === 200) {
                        alert("Updated");
                        localStorage.setItem("login", res.data.user.login);
                        localStorage.setItem("firstname", res.data.user.firstname);
                        localStorage.setItem("lastname", res.data.user.lastname);
                    }
                })
                .catch(err => {
                    alert(err.statusText)
                })
        };

        scope.updatePwd = () => {
            let url = [rootScope.API_URL, 'user', 'pwd'].join('/');
            url = `${url}?access_token=${localStorage.getItem('access_token')}`;

            http.put(url, scope.password)
                .then(res => {
                    if (res.status && res.status === 200) {
                        alert("Updated");
                        scope.password.oldpassword = "";
                        scope.password.password_1 = "";
                        scope.password.password_2 = "";
                    }
                })
                .catch(err => {
                    alert(err.statusText)
                })
        }
    }
]);