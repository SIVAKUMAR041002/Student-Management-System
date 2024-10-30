import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { StudentService } from '../student.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import * as StudentActions from '../store/student.actions';
import { StudentState } from '../store/student.reducer';
import { selectAllStudents } from '../store/student.selectors';
import { MatDialog } from '@angular/material/dialog';
import { StudentDetailDialogComponent } from '../student-detail-dialog/student-detail-dialog.component';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { ToastrService } from 'ngx-toastr';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-view-my-students',
  templateUrl: './view-my-students.component.html',
  styleUrls: ['./view-my-students.component.css']
})
export class ViewMyStudentsComponent implements OnInit {
  students: any[] = [];
  hoveredRow: any = null;
  filteredStudents = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['name', 'gender', 'age', 'eid', 'course', 'action'];
  expandedElementId: number | null = null;
  selectedGender: string = '';
  selectedCourse: string = '';

  constructor(
    private store: Store<StudentState>,
    private studentService: StudentService,
    private authService: AuthService,
    private router: Router,
    public dialog: MatDialog,
    private toastr: ToastrService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const username = this.authService.getUser().username;
    this.studentService.getStudentsByUser(username).subscribe(data => {
      this.students = data;
      this.filteredStudents.data = this.students;
    });
  }
  showSuccess(): void {
    this.toastr.success('This is a success message');
  }
  

  applyFilter(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filterValue = input.value.trim().toLowerCase();
    this.filteredStudents.filter = filterValue;
    this.applyCombinedFilter();
  }

  applyGenderFilter(event: any): void {
    this.selectedGender = event.value;
    this.applyCombinedFilter();
  }

  applyCourseFilter(event: any): void {
    this.selectedCourse = event.value;
    this.applyCombinedFilter();
  }

  applyCombinedFilter(): void {
    this.filteredStudents.data = this.students.filter(student => {
      return (
        (!this.selectedGender || student.gender === this.selectedGender) &&
        (!this.selectedCourse || student.course === this.selectedCourse) &&
        student.name.toLowerCase().includes(this.filteredStudents.filter)
      );
    });
  }

  onDelete(id: number): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Are you sure you want to delete this student?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.store.dispatch(StudentActions.deleteStudent({ id }));
        this.filteredStudents.data = this.filteredStudents.data.filter(student => student.id !== id);
        this.snackBar.open('Student Deleted successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: ['success-snackbar']  // Apply the custom CSS class
          
        });      }
    });
  }

  onUpdate(id: number): void {
    this.router.navigate(['/home/students/edit-student', id]);
  }

  onView(studentId: number): void {
    this.router.navigate(['/view-student', studentId]);
  }

  toggleExpand(id: number): void {
    this.expandedElementId = this.expandedElementId === id ? null : id;
  }

  onViewd(studentId: any): void {
    const student = this.filteredStudents.data.find(s => s.id === studentId);
    if (student) {
      this.dialog.open(StudentDetailDialogComponent, {
        data: student
      });
    }
  }

  drop(event: CdkDragDrop<any[]>): void {
    moveItemInArray(this.filteredStudents.data, event.previousIndex, event.currentIndex);
    this.filteredStudents.data = [...this.filteredStudents.data];
    this.studentService.replaceAllStudents(this.filteredStudents.data).subscribe();
  }
}
                                                                                              