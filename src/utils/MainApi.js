class MainApi {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  setToken(token) {
    this._headers = {
      ...this._headers,
      Authorization: `Bearer ${token}`,
    };
  }

  removeToken() {
    this._headers = basicHeaders;
  }

  checkToken(jwt) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        ...this._headers,
        Accept: "application/json",
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
      }),
    }).then(handleOriginalResponse);
  }

  authorize({ email, password }) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(handleOriginalResponse);
  }

  getCurrentUser() {
    return fetch(`${this._baseUrl}/users/me`, { 
      headers: this._headers,
      credentials: "include", 
    }).then(
      handleOriginalResponse
    );
  }

  updateCurrentUser(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      credentials: "include",
      body: JSON.stringify(data),
    }).then(handleOriginalResponse);
  }

  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, { 
      headers: this._headers,
      credentials: "include", 
    })
    .then(
      handleOriginalResponse
    );
  }

  setSavedMovie(movie) {
    return fetch(`${this._baseUrl}/movies`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify(movie),
    }).then(handleOriginalResponse);
  }

  deleteSavedMovie(movie) {
    return fetch(`${this._baseUrl}/movies/${movie._id}`, {
      method: "DELETE",
      headers: this._headers,
      credentials: "include",
    }).then(handleOriginalResponse);
  }

  logout() {
    return fetch(`${this._baseUrl}/signout`, {
      method: "GET",
      headers: this._headers,
      credentials: "include",
    }).then(handleOriginalResponse);
  }
}

// helper
const handleOriginalResponse = (res) => {
  if (res.ok) {
    return res.json().then((result) => result);
  }

  res
    .json()
    .then((result) => console.log("AuthApi error:", result))
    .catch((err) => console.log("AuthApi error:", err));

  return Promise.reject(res);
};

const basicHeaders = {
  "Content-Type": "application/json",
  "User-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36",
};

const mainApi = new MainApi({
  baseUrl: "https://movies-explorer-api.nomoredomains.rocks",
  headers: basicHeaders,
});

export default mainApi;
