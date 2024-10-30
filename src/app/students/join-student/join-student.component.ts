import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { addStudent } from '../../store/student.actions';
import { StudentState } from '../../store/student.reducer';

@Component({
  selector: 'app-join-student',
  templateUrl: './join-student.component.html',
  styleUrls: ['./join-student.component.css']
})
export class JoinStudentComponent {
  student = { name: '', age: 0, addedBy: '', gender: '', dob: new Date(), course: '', phno: '', eid: '' };
  courses = ['Computer Science and Engineering', 'Mechanical Engineering', 'Electrical and Electronics Engineering', 'Electronics and Communication Engineering', 'Civil Engineering'];

  constructor(
    private store: Store<StudentState>,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  onSubmit(): void {
    this.student.addedBy = this.authService.getUser().username;
    this.store.dispatch(addStudent({ student: this.student }));
    this.snackBar.open('Student added successfully!', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['success-snackbar']  // Apply the custom CSS class
      
    });
    this.router.navigate(['/home/view-my-students']);
  }

  resetForm(form: any): void {
    form.resetForm();
    this.student = { name: '', age: 0, addedBy: '', gender: '', dob: new Date(), course: '', phno: '', eid: '' };
  }
}
