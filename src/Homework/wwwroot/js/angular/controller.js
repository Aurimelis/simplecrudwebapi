app.controller('APIController', function ($scope, APIService) {
    getAll();

    function getAll() {
        var servCall = APIService.getUsers();
        servCall.then(function (d) {
            $scope.users = d.data;

            for (var i = 0, length = $scope.users.length; i < length; i++) {
                $scope.editingData[$scope.users[i].id] = false;
            }
        },
            function (error) {
                console.log('Oops! Something went wrong while fetching the data.');
            });
    }

    $scope.saveUser = function () {
        var user = {
            firstName: $scope.firstName,
            lastName: $scope.lastName,
            address: $scope.address,
            city: $scope.city,
            postalCode: $scope.postalCode
        };

        var saveUser = APIService.saveUser(user);
        saveUser.then(function (d) {
            getAll();
        },
            function (error) {
                console.log('Oops! Something went wrong while saving the data.');
            });
    };

    $scope.editingData = {};

    $scope.modify = function (user) {
        $scope.editingData[user.id] = true;
    };

    $scope.update = function (user) {
        $scope.editingData[user.id] = false;

        console.log(user);
        var upd = APIService.updateUser(user);
        upd.then(function (d) {
            getAll();
        },
            function (error) {
                console.log('Oops! Something went wrong while updating the data.');
            });
    };

    $scope.cancelModify = function (user) {
        $scope.editingData[user.id] = false;
    };

    $scope.dltUser = function (userId) {
        var dlt = APIService.deleteUser(userId);
        dlt.then(function(d) {
                getAll();
            },
            function(error) {
                console.log('Oops! Something went wrong while deleting the data.');
            });
    };

    $scope.makeEditable = function (obj) {
        obj.target.setAttribute("contenteditable", true);
        obj.target.focus();
    };
})