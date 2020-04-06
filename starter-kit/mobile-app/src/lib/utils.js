import Config from 'react-native-config';

import DeviceInfo from 'react-native-device-info';

let serverUrl = Config.STARTER_KIT_SERVER_URL;
if (serverUrl.endsWith('/')) {
  serverUrl = serverUrl.slice(0, -1)
}
// const serverUrl = 'http://localhost:3000';

const uniqueid = DeviceInfo.getUniqueId();

export const userID = () => {
  return uniqueid;
}

export const search = (query) => {
  const type = query.type ? `type=${query.type}` : ''
  const name = query.name ? `name=${query.name}` : ''
  const userID = query.userID ? `userID=${query.userID}` : ''

  return fetch(`${serverUrl}/api/resource?${name}&${type}&${userID}`, {
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
  return fetch(`${serverUrl}/api/resource`, {
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

export const update = (item) => {
  return fetch(`${serverUrl}/api/resource/${item.id}`, {
    method: 'PATCH',
    mode: 'no-cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(item)
  }).then((response) => {
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Item not found');
      } else {
        throw new Error('Please try again. If the problem persists contact an administrator.');
      }
    }
  });
};

export const remove = (item) => {
  return fetch(`${serverUrl}/api/resource/${item.id}`, {
    method: 'DELETE',
    mode: 'no-cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    }
  }).then((response) => {
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('Item not found');
      } else {
        throw new Error('Please try again. If the problem persists contact an administrator.');
      }
    }
  });
};

export const session = () => {
  return fetch(`${serverUrl}/api/session`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        return response.text();
      }
    });
};

export const message = (payload) => {
  return fetch(`${serverUrl}/api/message`, {
    method: 'POST',
    mode: 'no-cors',
    cache: 'no-cache',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(payload)
  });
};
