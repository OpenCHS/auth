var Cognito = require('amazon-cognito-identity-js');

global.navigator = function () {
    return null;
};

var getToken = function (poolId, clientId, username, password) {
    var authenticationDetails = new Cognito.AuthenticationDetails({
        Username: username,
        Password: password
    });
    var userPool = new Cognito.CognitoUserPool({
        UserPoolId: poolId,
        ClientId: clientId
    });
    var cognitoUser = new Cognito.CognitoUser({Username: username, Pool: userPool});
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            console.log(result.getIdToken().getJwtToken());
        },
        onFailure: function (error) {
            console.log("Check Credentials. " + "PoolId=" + poolId + " ClientId=" + clientId + " Username=" + username + " Password=" + password);
        },
        newPasswordRequired: function (userAttributes, requiredAttributes) {
            cognitoUser.completeNewPasswordChallenge(password, userAttributes, this);
        }
    })
};

module.exports = getToken;