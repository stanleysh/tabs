import tokenService from './tokenService';

function getUserQuestions (apiPath) {
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    };
    return fetch(apiPath, options).then(res => res.json());
};