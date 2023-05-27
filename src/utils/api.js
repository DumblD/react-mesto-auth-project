class Api {
  constructor(options) {
    this._url = options.baseUrl;
    this._headers = options.headers;
  }

  _checkServerResponseState(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  _request(url, options) {
    return fetch(url, options).then((res) => this._checkServerResponseState(res));
  }

  getInitialCards() {
    return this._request(this._url, {
      method: 'GET',
      headers: this._headers,
    });
  }

  addNewCard(data) {
    return this._request(this._url, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(data),
    });
  }

  deleteCard(cardId) {
    return this._request(this._url + `/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  getUserInfo() {
    return this._request(this._url.slice(0,-5) + "users/me", {
      method: 'GET',
      headers: this._headers,
    });
  }

  updateUserInfo(name, about) {
    return this._request(this._url.slice(0,-5) + "users/me", {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    });
  }

  updateUserAvatar(avatarLink) {
    return this._request(this._url.slice(0,-5) + "users/me/avatar", {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarLink
      })
    });
  }

  setLike(cardId) {
    return this._request(this._url + `/${cardId}/likes`, {
      method: 'PUT',
      headers: this._headers,
    });
  }

  deleteLike(cardId) {
    return this._request(this._url + `/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    });
  }

  changeLikeCardStatus(cardId, isLiked) {
    return isLiked? this.deleteLike(cardId) : this.setLike(cardId);
  }
}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-62/cards',
  headers: {
    authorization: 'f8467b0b-f7fd-4121-966e-12a5314122ec',
    'Content-Type': 'application/json'
  }
});
