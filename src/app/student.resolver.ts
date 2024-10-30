import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { StudentService } from './student.service';

@Injectable({
  providedIn: 'root',
})
export class StudentResolver implements Resolve<any> {
  constructor(private studentService: StudentService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const id = route.paramMap.get('id')!;
    return this.studentService.getStudentById(id);
  }
}
