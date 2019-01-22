"use strict";
exports.__esModule = true;
var User = /** @class */ (function () {
    function User(email, name, password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }
    User.prototype.matches = function (another) {
        return another !== undefined && another.email === this.email && another.password === this.password;
    };
    return User;
}());
exports.User = User;
exports.users = {
    'jbcisne@gmail.com': new User('jbcisne@gmail.com', 'Juliano', '123456'),
    'paty@gmail.com': new User('jbcisne@gmail.com', 'Patricia', '123456')
};
