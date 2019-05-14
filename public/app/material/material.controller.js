angular.module('boris').controller('materialController', [
    '$scope',
    '$rootScope',
    '$http',
    '$location',
    function (scope, rootScope, http, $location) {
        scope.materialList = [];
        scope.search = "";
        scope.isLoading = false;

        scope.getMaterilaList = () => {
            scope.isLoading = true;
            let url = [rootScope.API_URL, 'material'].join('/');
            url = `${url}?access_token=${localStorage.getItem('access_token')}&search=${scope.search}`;

            http.get(url)
                .then(res => {
                    let data = res.data || null;
                    if (data && data.materials && data.materials.length) {
                        scope.materialList = angular.copy(data.materials);
                    }
                    scope.isLoading = false;
                })
                .catch(err => {
                    if (err.status === 404) {
                        scope.materialList = [];
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
                scope.getMaterilaList();
            }, 1000);
        });
    }
]);