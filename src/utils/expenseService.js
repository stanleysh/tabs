import tokenService from './tokenService';

function getUserExpenses (apiPath) {
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    };
    return fetch(apiPath, options).then(res => res.json());
};

function getMonthlyCost (apiPath) {
    const options = {
        method: 'GET',
        headers: {
            'Content-type': 'application/json',
            'Authorization': 'Bearer ' + tokenService.getToken()
        }
    }
    return fetch(apiPath, options).then(res => res.json());
}

export default {
    getUserExpenses
}