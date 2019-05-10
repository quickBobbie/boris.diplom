function answerModalController ($scope, $mdDialog) {
    $scope.answer = {
        title: "",
        isValid: false
    };

    $scope.cancel = () => {
        $mdDialog.cancel();
    };

    $scope.create = () => {
        if ($scope.answer.title) {
            $mdDialog.hide($scope.answer);
        } else {
            $mdDialog.hide(null);
        }
    }
}