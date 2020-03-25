import Config from 'react-native-config';

const serverUrl = Config.STARTER_KIT_SERVER_URL;
// const serverUrl = 'http://localhost:3000';

export const search = (query) => {
  const type = query.type ? `type=${query.type}` : ''
  const name = query.name ? `name=${query.name}` : ''

  return fetch(`${serverUrl}/api/supplies?${name}&${type}`, {
    method: 'GET',
    mode: 'no-cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText || response.message || response.status);
    } else {
      return response.json();
    }
  });
};

export const add = (item) => {
  return fetch(`${serverUrl}/api/supplies`, {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  }).then((response) => {
    if (!response.ok) {
      throw new Error(response.statusText || response.message || response.status);
    } else {
      return response.json();
    }
  });
};
