class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkStatus(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getMovies() {
    return fetch(this._baseUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(this._checkStatus);
  }
}

const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
});

export default moviesApi;
