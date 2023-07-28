class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getUser() {
    return fetch(this._baseUrl + '/users/me', {
        method: 'GET',
        headers: this._headers,
    }).then(this._checkStatus);
  }

  updateUser(userObj) {
     return fetch(this._baseUrl + '/users/me', {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
            name: userObj.name,
            email: userObj.email,
        }),
     }).then(this._checkStatus);
  }

  getMovies() {
    return fetch(this._baseUrl + '/movies', {
        method: 'GET',
        headers: this._headers,
    }).then(this._checkStatus);
  }

  createMovie(movieObj) {
    return fetch(this._baseUrl + '/movies', {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify(movieObj),
    }).then(this._checkStatus);
  }

  deleteMovie(movieId) {
    return fetch(this._baseUrl + `/movies/${movieId}`, {
        method: 'DELETE',
        headers: this._headers,
    }).then(this._checkStatus);
  }

  register({ name, email, password }) {
    return fetch(this._baseUrl + '/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    }).then(this._handleRes);
  }

  login({ email, password }) {
    return fetch(this._baseUrl + '/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    }).then(this._handleRes);
  }

  getUserInfo(jwt) {
    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this._checkStatus);
  }

}

const mainApi = new MainApi({
  baseUrl: "https://api.tim2772.nomoredomains.work",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("jwt")}`,
    "Content-Type": "application/json",
  },
});

export default mainApi;
