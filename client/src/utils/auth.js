import decode from 'jwt-decode';

class Auth {
  login(token) { // save token to local storage
    localStorage.setItem('id_token', token);
    window.location.assign('/dashboard'); // reload page
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  getUser() {
    return decode(this.getToken());
  }

  isTokenExpired(token) {
    try {
      const decodedToken = decode(token);
      // check if expiration time has passed
     if (decodedToken.exp < Date.now()/1000) {
       return true;
     } else {
       return false;
     }
    } catch (err) {
      return false;
    }
  }

  isLoggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token);
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/'); // reload page
  }
};

export default new Auth();
