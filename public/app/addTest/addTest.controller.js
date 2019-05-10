angular.module('boris').controller('addTestController', [
    '$scope',
    '$http',
    '$rootScope',
    '$location',
    function (scope, http, rootScope, $location) {
        scope.data = {
            title: "",
            description: ""
        };

        scope.submit = () => {
            let url = [rootScope.API_URL, 'test', 'create'].join('/');
            url = `${url}?access_token=${localStorage.getItem('access_token')}`;

            http.post(url, scope.data)
                .then(res => {
                    if (res.status && res.status === 201) {
                        $location.path(`/${res.data.test._id}/upload`)
                    }
                })
                .catch(err => {
                    alert(err.statusText);
                })
        }
    }
]);