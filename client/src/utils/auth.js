// jwt-decode is a helper library for working with JSON Web Tokens
// it is used to extract nonsensitive data such as expiration dates
import decode from 'jwt-decode';

// create a new JS class called AuthService
class AuthService {
    // retrieve data saved in token
    getProfile() {
        return decode(this.getToken());
    }

    // check if the user is still logged in
    loggedIn() {
        // Checks if there is a saved token and it's still valid
        const token = this.getToken();
        // use type coercion to check if token is NOT undefined and the token is NOT expired
        return !!token && !this.isTokenExpired(token);
    }

    // check it the token has expired
    isTokenExpired(token) {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    }

    // retrieve token from localStorage
    getToken() {
        return localStorage.getItem('id_token');
    }

    // set token to localStorage and reload page to homepage
    login(idToken) {
        // Saves user token to localStorage
        localStorage.setItem('id_token', idToken);

        window.location.assign('/');
    }

    // clear token from localStorage and force logout with reload
    logout() {
        // Clear user token and profile data from localStorage
        localStorage.removeItem('id_token');
        // this will reload the page and reset the state of the application
        window.location.assign('/');
    }
}

// instantiate a new version for every component that imports it.
// Not always necessary but ensures we are using a new version of the functionality and takes out some of the risk of leaving remnant data.
export default new AuthService();