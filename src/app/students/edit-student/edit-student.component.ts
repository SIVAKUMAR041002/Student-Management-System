import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../student.service';
import { Store } from '@ngrx/store';
import * as StudentActions from '../../store/student.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrl: './edit-student.component.css'
})
export class EditStudentComponent {
  student: any = {};
  courses = ['Computer Science and Engineering', 'Mechanical Engineering', ' Electrical and Electronics Engineering', 'Electronics and Communication Engineering', 'Civil Engineering'];
  errorMessage$: Observable<string | null>;
  successMessage$: Observable<string | null>;

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<any>
  ) {
    this.errorMessage$ = this.store.select(state => state.students.error);
    this.successMessage$ = this.store.select(state => state.students.successMessage);

  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.studentService.getStudentById(id).subscribe(data => {
      this.student = data;
    });
  }

  onSubmit(): void {
    this.store.dispatch(StudentActions.updateStudent({ student: this.student }));

    // Navigate to view students on successful update
    this.store.select(state => state.students.error).subscribe(error => {
      if (!error) {
        this.router.navigate(['/home/view-my-students']);
      }
    });
  }
  goBack(): void {
    this.router.navigate(['/home/view-my-students']); // Update the route as needed
  }

  resetForm(form: any): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.studentService.getStudentById(id).subscribe(data => {
      this.student = data;
    });
  }

}
