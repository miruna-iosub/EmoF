const path = require('path');
const fs = require('fs');

function getView(url) {
    return fs.readFileSync(path.join(__dirname, url))
}

let signin = getView('./signin.html');
let signup = getView('./signup.html');
let index = getView('./index.html');
//let viewForgotPassword = getView('./forgotPassword.html');
//let viewLogin = getView('./index.html');
//let viewInfo = getView('./info.html');
//let viewMyAccount = getView('./myAccount.html');
//let viewRegister = getView('./register.html');

module.exports = {
    signin, signup, index
}