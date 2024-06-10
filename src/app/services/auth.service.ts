import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/users';
  private tokenKey = 'auth-token';

  constructor(private http: HttpClient, private router: Router) { }

  register(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  login(credentials: { email: string, password: string }): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
        if (user) {
          localStorage.setItem(this.tokenKey, 'dummy-token');
          return true;
        }
        return false;
      })
    );
  }

  logout(hienThiXacNhan: boolean = true): void {
    if (hienThiXacNhan && !confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      return;
    }
    localStorage.removeItem(this.tokenKey);

    localStorage.removeItem('user');
    this.router.navigate(['/signin']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(this.apiUrl);
  }

  deleteUser(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }

}
