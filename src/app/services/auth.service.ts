import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _http = inject(HttpClient);
  private urlBase: string = 'http://localhost:8080/api/auth';

  private loggedIn = new BehaviorSubject<boolean>(false);

  login(credentials: { email: string, password: string }): Observable<any> {
    return this._http.post<any>(this.urlBase+'/login', credentials)
      .pipe(
        tap(() => this.loggedIn.next(true))
      );
  }

  logout(): void {
    this.loggedIn.next(false);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  signup(user: { name: string, lastName: string, email: string, password: string, phone: String | null }): Observable<any>{
    return this._http.post<any>(this.urlBase+'/signup', user);
  }
}
