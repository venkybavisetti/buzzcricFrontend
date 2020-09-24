const postReq = (url, data) => {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then((data) => data.json());
};

const getReq = (url) => {
  return fetch(url).then((res) => res.json());
};

const buzzcricApi = (action) => {
  switch (action.type) {
    case 'setupMatch':
      return postReq('/api/setupMatch', action.data);
    case 'updateInPP':
      return postReq(`/api/updateInPP/${action.id}`, action.data);
    case 'updateScore':
      return postReq(`/api/updateScore/${action.id}`, action.data);
    case 'getInPlay':
      return getReq(`/api/getInPlay/${action.id}`);
    case 'choosePlayers':
      return getReq(`/api/choosePlayers/${action.id}`);
    case 'getMatches':
      return getReq('/api/getMatches');

    default:
      return new Promise((_res, reject) => reject());
  }
};

export { buzzcricApi };
