class MainApi {
  constructor (option) {
    this._baseUrl = option.baseUrl;
    this._headers = option.headers;
  }

  _getResponse(res) {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Внимание! Ошибка: ${res.status}`)
  }

  register({ name, password, email }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        password,
        email,
      })
    })
    .then((res) => this._getResponse(res));
  }

  authorize({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      })
    })
    .then((res) => this._getResponse(res));
  }

  getCurrentUser() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    })
    .then((res) => this._getResponse(res));
  }

  updateCurrentUser(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        name: data.name,
        email: data.email,
      })
    })
    .then((res) => this._getResponse(res));
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    })
    .then((res) => this._getResponse(res));
  }

  setSavedMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailer: movie.trailer,
        thumbnail: movie.thumbnail,
        movieId: movie.movieId,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
    })
    .then((res) => this._getResponse(res));
  }

  deleteSavedMovie(movie) {
    return fetch(`${this._baseUrl}/movies/${movie._id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    })
    .then((res) => this._getResponse(res));
  }

  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    })
    .then((res) => this._getResponse(res));
  }
}

const mainApi = new MainApi({
  baseUrl: "https://movies-explorer-api.nomoredomains.rocks",
  headers: {
    "Content-Type": "application/json",
  },
});

export default mainApi;

/*class MainApi {
  constructor ({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  setToken(token) {
    this._headers = {
      ...basicHeaders,
      Authorization: `Bearer ${token}`,
    };
  }

  removeToken() {
    this._headers = basicHeaders;
  }

  checkToken(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Accept: 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }).then(handleOriginalResponse);
  }

  register({ name, password, email }) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        password,
        email,
      })
    })
    .then(handleOriginalResponse);
  }

  authorize({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      })
    })
    .then(handleOriginalResponse);
  }

  getCurrentUser() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(
      handleOriginalResponse
    );
  }

  updateCurrentUser(email, name) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        email: email,
        name: name,
      }),
    }).then(handleOriginalResponse);
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    })
    .then(handleOriginalResponse);
  }

  setSavedMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        country: movie.country,
        director: movie.director,
        duration: movie.duration,
        year: movie.year,
        description: movie.description,
        image: movie.image,
        trailer: movie.trailer,
        thumbnail: movie.thumbnail,
        movieId: movie.movieId,
        nameRU: movie.nameRU,
        nameEN: movie.nameEN,
      })
    })
    .then(handleOriginalResponse);
  }

  deleteSavedMovie(_id) {
    return fetch(`${this._baseUrl}/movies/${_id}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(handleOriginalResponse);
  }

  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    })
    .then(handleOriginalResponse);
  }
}

const handleOriginalResponse = (res) => {
  if (res.ok) {
    return res.json().then((result) => result);
  }

  res
    .json()
    .then((result) => console.log('AuthApi error:', result))
    .catch((err) => console.log('AuthApi error:', err));

  return Promise.reject(res);
};

const basicHeaders = {
  'Content-Type': 'application/json',
  'User-agent':
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36',
};

const mainApi = new MainApi({
  baseUrl: "https://movies-explorer-api.nomoredomains.rocks",
  headers: basicHeaders,
});

export default mainApi;*/