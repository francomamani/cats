import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment.development'; 
import { User } from '../interfaces/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  http  = inject(HttpClient);

  public getUsers(): Observable<{ users: User[] }> {
    return this.http.get<{ users: User[] }>(`${environment.baseUrl}users`);
  }

}
