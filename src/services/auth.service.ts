import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../environment/environment';
import { tap } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = environment.apiUrl;
   isAlreadyHaveAccount = signal(false);

  constructor(
    private _http: HttpClient,
  ) { }


  signup(signUpPayload: any) {
    return this._http.post(`${this.baseUrl}auth/signup`, signUpPayload).pipe(
      tap((response: any) => {
        console.log('Signup response:', response);
      })
    );
  }

  login(loginPayload:any){
    return this._http.post(`${this.baseUrl}auth/login`,loginPayload).pipe(
      tap((response:any) => {
        console.log("login response", response);
      })
    )
  }

  

}
