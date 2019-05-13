angular.module('boris').controller('uploadMaterialController', [
    '$scope',
    '$http',
    '$rootScope',
    '$location',
    '$routeParams',
    function (scope, http, rootScope, $location, $routeParams) {
        scope.file = null;

        scope.submit = () => {
            if (!scope.file) {
                return $location.path(`/${$routeParams.testId}/questionlist`);
            }

            let url = [rootScope.API_URL, 'test', $routeParams.testId, 'material', 'upload'].join('/');
            url = `${url}?access_token=${localStorage.getItem('access_token')}`;

            let formData = new FormData();
            formData.append('material', scope.file);

            http.post(url, formData, {
                headers: {
                    'Content-type': undefined
                }
            })
                .then(res => {
                    if (res.status && res.status === 200) {
                        $location.path(`/${$routeParams.testId}/questionlist`);
                    }
                })
                .catch(err => {
                    alert(err.statusText)
                })
        };

        scope.getFile = () => {
            scope.file = document.querySelector('#material').files[0];
            scope.$apply();
        };

        scope.changeFile = () => {
            document.querySelector('#material').click()
        };


    }
]);