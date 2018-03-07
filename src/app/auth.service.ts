export class AuthService {
    loggedIn = false;

    /*isAuthenticated() {
        const promise = new Promise(
            ()
        );
    }*/

    login() {
        this.loggedIn = true;
    }
    
    logout() {
        this.loggedIn = false;
    }
}