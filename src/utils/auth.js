export const BASE_URL = 'https://auth.nomoreparties.co';

function checkServerResponseState(res) {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Ошибка: ${res.status}`);
}

export const register = (registerData) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(registerData)
  })
    .then((response) => {
      return checkServerResponseState(response);
    })
    .then((res) => {
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};
export const authorize = (loginData) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })
    .then((response) => {
      return checkServerResponseState(response);
    })
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        return data;
      }
    })
    .catch(err => {
      alert(`${err}
Попробуйте ещё раз.`);
    })
};
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })
    .then((res) => {
      return res.json();
    })
    .then(data => data)
}
