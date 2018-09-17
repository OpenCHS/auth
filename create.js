var Cognito = require('amazon-cognito-identity-js');

function attribute(keyVal) {
    return {Name: keyVal[0], Value: keyVal[1]};
}

function createUser(userPoolID, clientID, username, password, catchmentId, email, phoneNumber, orgName, orgId, isAdmin) {
    var poolData = {
        UserPoolId: userPoolID,
        ClientId: clientID
    };
    var userPool = new Cognito.CognitoUserPool(poolData);
    var attributeList = [
        ["email", email],
        ["phone_number", phoneNumber],
        ["custom:organisationId", orgId],
        ["custom:organisationName", orgName],
        ["custom:isUser", true],
        ["custom:catchmentId", catchmentId],
        ["custom:isAdmin", isAdmin],
        ["custom:isOrganisationAdmin", false]].map(attribute);

    userPool.signUp(username, password, attributeList, null, function (err, result) {
        if (err) {
            console.log(err.message || JSON.stringify(err));
            return;
        }
        var cognitoUser = result.user;
        console.log('user name is ' + cognitoUser.getUsername());
    });
}

module.exports = createUser;