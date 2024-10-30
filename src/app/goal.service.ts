import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoalService {
  private apiUrl = 'http://localhost:3000/goals';

  constructor(private http: HttpClient) {}

  addGoal(goal: any): Observable<any> {
    return this.http.post(this.apiUrl, goal);
  }

  getGoalsByUser(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?addedBy=${username}`);
  }

  getGoalById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  getGoal(): Observable<any[]> {
    return this.http.get<any>(`${this.apiUrl}`);
  }

  deleteGoal(id: any): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  updateGoal(id: string, goal: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, goal);
  }
  
}
