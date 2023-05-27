export const BASE_URL = 'https://auth.nomoreparties.co';

function checkServerResponseState(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}

function request(endpoint, options) {
  const url = `${BASE_URL}${endpoint}`;
  return fetch(url, options).then(checkServerResponseState)
}

export const register = (registerData) => {
  return request('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerData)
  })
};

export const authorize = (loginData) => {
  return request('/signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })
  .then((data) => {
    if (data.token) {
      localStorage.setItem('jwt', data.token);
      return data;
    }
  })
};

export const checkToken = (token) => {
  return request('/users/me', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
}
