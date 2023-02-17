var session = require('express-session');
var Keycloak = require('keycloak-connect');

let _keycloak;

// var keycloakConfig  = {
//     clientId: 'nodejs-microservice',
//     bearerOnly: true,
//     serverUrl: 'http://localhost:8080/',
//     realm: 'force-de-vente',
//     credentials: {
//         secret: 'bio5xjSxLbVRbdEhZlnDgCKahtaV9zDQ'
//     }
// };

// cloud IAM with keycloak config 
var keycloakConfig  = {
    clientId: 'forcedevente-api',
    bearerOnly: true,
    serverUrl: 'https://lemur-11.cloud-iam.com/auth',
    realm: 'force-de-vente',
    credentials: {
        secret: 'qYvZ1am20pVWYC78v11oY0CnfxnV1p67'
    }
};




function initKeycloak(memoryStore) {
    if (_keycloak) {
        console.warn("Trying to init Keycloak again!");
        return _keycloak;
    } 
    else {
        console.log("Initializing Keycloak...");
        //var memoryStore = new session.MemoryStore();
        _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig);
        console.log("Keycloak initialized");
        return _keycloak;
    }
}

// function initKeycloak(memoryStore) { 
//     if (_keycloak) { console.warn("Trying to init Keycloak again!"); 
//     return _keycloak; } 
//     else 
//     { console.log("Initializing Keycloak..."); 
//     _keycloak = new Keycloak({ store: memoryStore }, keycloakConfig); 
//     return _keycloak; } }

function getKeycloak() {
    if (!_keycloak){
        console.error('Keycloak has not been initialized. Please called init first.');
    } 
    return _keycloak;
}

module.exports = {
    initKeycloak,
    getKeycloak
};