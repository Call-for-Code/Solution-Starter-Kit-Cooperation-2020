import Config from 'react-native-config';

import DeviceInfo from 'react-native-device-info';

const serverUrl = Config.STARTER_KIT_SERVER_URL;
// const serverUrl = 'http://localhost:3000';

const uniqueid = DeviceInfo.getUniqueId();

export const userID = () => {
  return uniqueid;
}

export const search = (query) => {
  const type = query.type ? `type=${query.type}` : ''
  const name = query.name ? `name=${query.name}` : ''
  const userID = query.userID ? `userID=${query.userID}` : ''

  return fetch(`${serverUrl}/api/supplies?${name}&${type}&${userID}`, {
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
