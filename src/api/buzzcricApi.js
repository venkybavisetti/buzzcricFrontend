const postReq = (url, data) => {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    }).then((data) => {
      const response = data.json();
      if (data.status === 403) {
        reject(response);
        return;
      }
      resolve(response);
    });
  });
};

const getReq = (url) => {
  return new Promise((resolve, reject) => {
    return fetch(url).then((data) => {
      const response = data.json();
      if (data.status === 403) {
        reject(response);
        return;
      }
      resolve(response);
    });
  });
};

const buzzcricApi = (action) => {
  switch (action.type) {
    case 'setupMatch':
      return postReq('/api/setupMatch', action.data);
    case 'updateInPP':
      return postReq(`/api/updateInPP/${action.id}`, action.data);
    case 'updateScore':
      return postReq(`/api/updateScore/${action.id}`, action.data);
    case 'logout':
      return postReq('/api/logout');
    case 'getInPlay':
      return getReq(`/api/getInPlay/${action.id}`);
    case 'choosePlayers':
      return getReq(`/api/choosePlayers/${action.id}`);
    case 'getMatches':
      return getReq('/api/getMatches');
    case 'scoreBoard':
      return getReq(`/api/scoreBoard/${action.id}`);
    case 'getUser':
      return getReq('/api/getUser');

    default:
      return new Promise((_res, reject) => reject());
  }
};

export { buzzcricApi };
