app.service("APIService", function ($http) {
    this.getUsers = function () {
        return $http.get("api/users");
    }

    this.saveUser = function (user) {
        return $http(
        {
            method: 'post',
            data: user,
            url: '/api/users'
        });
    }

    this.updateUser = function (user) {
        return $http(
        {
            method: 'put',
            data: user,
            url: 'api/users/' + user.id
        });
    }

    this.deleteUser = function (userId) {
        var url = 'api/users/' + userId;
        return $http(
        {
            method: 'delete',
            data: userId,
            url: url
        });
    }
});