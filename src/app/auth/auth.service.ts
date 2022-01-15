import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";


export interface authResponseData{
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({providedIn:'root'})
export class AuthService{

    // Behaviour subject is pretty much similiar to the normal subject
    // however, we could access the previously emitted data once we subscribe to it
    user = new BehaviorSubject<User>(null);

    private tokenExpirationTimer: any;


    constructor(private httpClient: HttpClient, private router: Router) {}

    signup(email: string, password: string){
        return this.httpClient.post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZmZ13k0ohFDE7Hz9XuaCI6-eRd6ayt8M', 
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError), 
            tap(resData => this.handleUserAuth(resData.email, resData.localId, resData.idToken, resData.expiresIn)));
    }

    autoLogin(){
        // .parse will parse string back to javascript object
        const userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if(loadedUser.token){
            this.user.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
        }
    }

    login(email: string, password: string){
        return this.httpClient.post<authResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZmZ13k0ohFDE7Hz9XuaCI6-eRd6ayt8M',
        {
            email: email,
            password: password,
            returnSecureToken: true
        })
        .pipe(catchError(this.handleError), tap(resData => this.handleUserAuth(resData.email, resData.localId, resData.idToken, resData.expiresIn)));
    }

    logout(){
        this.user.next(null);
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() => this.logout(), expirationDuration);
    }


    private handleError(errorRes: HttpErrorResponse){
        let errorMessage = 'An error occurred!'
        if(!errorRes.error || !errorRes.error.error){
            return throwError(() => errorMessage);
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS':
                errorMessage = 'This email address is already used by another account!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'Email address does not exists.'
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'The password is invalid or the user does not have a password.'
                break;
        }
        return throwError(() => errorMessage);
    }

    private handleUserAuth(email: string, localId: string, idToken: string, expiresIn: string){
        const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
        const user = new User(email, localId, idToken, expirationDate);
        this.user.next(user);
        this.autoLogout(+expiresIn * 1000);
        // Storing into local storage as well
        // .stringify convert javascript object to a string
        localStorage.setItem('userData', JSON.stringify(user));
    }

}