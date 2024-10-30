import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  // Add a new student
  addStudent(student: any): Observable<any> {
    return this.http.post(this.apiUrl, student);
  }

  // Get students added by a specific user
  getStudentsByUser(username: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?addedBy=${username}`);
  }

  // Get all students
  getAllStudents(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getStudentById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
  
  // Update a student's details
  updateStudent(student: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${student.id}`, student);
  }


  getStudentsByCourse(course: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}?course=${course}`);
  }
  replaceAllStudents(students: any[]): Observable<any> {
    // Create an observable array for deleting existing students
    const deleteObservables = students.map(student =>
      this.http.delete<void>(`${this.apiUrl}/${student.id}`)
    );
  
    // Create an observable array for adding new students
    const postObservables = students.map(student =>
      this.http.post(this.apiUrl, student)
    );
  
    // Return an observable that completes when all delete requests and all post requests are done
    return forkJoin([
      ...deleteObservables,  // Wait for all deletes to complete
      ...postObservables     // Then wait for all posts to complete
    ]);
  }
  

  
}
