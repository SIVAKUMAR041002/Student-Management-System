import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:3000/users';  // Adjust path if necessary

  constructor(private http: HttpClient) { }

  // Get a single user by username
  getUser(username: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?username=${username}`);
  }

  // Update an existing user
  updateUser(updatedUser: any): Observable<any> {
    // Assuming `updatedUser` contains an `id` to identify which user to update
    return this.http.put<any>(`${this.apiUrl}/${updatedUser.id}`, updatedUser);
  }
}
