import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs'; // Import 'of' từ 'rxjs'
import { map } from 'rxjs/operators';
import { Iuser } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, data);
  }

  login(credentials: { email: string, password: string }): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
        return !!user;
      })
    );
  }

  getUsers(): Observable<Iuser[]> {
    return this.http.get<Iuser[]>(this.apiUrl);
  }

  deleteUser(id: number): Observable<boolean> {
    return this.http.delete<boolean>(`${this.apiUrl}/${id}`);
  }
}
