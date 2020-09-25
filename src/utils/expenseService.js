import tokenService from './tokenService';

function requestHelper(type, path, data) {
  const option = {
    method: type,
    headers: new Headers({
      'Content-type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`,
    }),
  };
  if (type === 'POST' || type === 'PUT') option.body = JSON.stringify(data);
  return fetch(path, option).then(async (res) => {
    const updateData = await res.json();
    if (res.ok) return updateData;
    throw new Error(updateData.error);
  });
}

function getUserExpenses(apiPath) {
  const options = {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
  };
  return fetch(apiPath, options).then((res) => res.json());
}

// function getMonthlyCost (apiPath) {
//     const options = {
//         method: 'GET',
//         headers: {
//             'Content-type': 'application/json'
//         }
//     }
//     return fetch(apiPath, options).then(res => res.json());
// }

function getMonthlyCost(url, data = { user: undefined }) {
  if (data.user === undefined) data.user = 'demo';
  const path = `${url}/${data.user}`;
  return requestHelper('GET', path);
}

function getDemoMonthlyCost(url, data = { user: 'demo' }) {
  const path = `${url}/${data.user}`;
}

export default {
  getUserExpenses,
  getMonthlyCost,
};
