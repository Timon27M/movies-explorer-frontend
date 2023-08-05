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

  getUser(jwt) {
    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this._checkStatus);
  }

  updateUser(userObj, jwt) {
    return fetch(this._baseUrl + "/users/me", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({
        name: userObj.name,
        email: userObj.email,
      }),
    }).then(this._checkStatus);
  }

  getMovies(jwt) {
    return fetch(this._baseUrl + "/movies", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this._checkStatus);
  }

  createMovie(movieObj, jwt) {
    return fetch(this._baseUrl + "/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify(movieObj),
    }).then(this._checkStatus);
  }

  deleteMovie(movieId, jwt) {
    return fetch(this._baseUrl + `/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this._checkStatus);
  }

  register({ name, email, password }) {
    return fetch(this._baseUrl + "/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    }).then(this._checkStatus);
  }

  login({ email, password }) {
    return fetch(this._baseUrl + "/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._checkStatus);
  }

  getUserInfo(jwt) {
    return fetch(this._baseUrl + "/users/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
    }).then(this._checkStatus);
  }
}

const mainApi = new MainApi({
  baseUrl: "https://api.tim2772.nomoredomains.work",
});

export default mainApi;
