import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import * as StudentActions from '../../store/student.actions';
import { StudentState } from '../../store/student.reducer';
import { selectAllStudents } from '../../store/student.selectors';

@Component({
  selector: 'app-school-student',
  templateUrl: './school-student.component.html',
  styleUrls: ['./school-student.component.css']
})
export class SchoolStudentComponent implements OnInit {
  students$: Observable<any[]>; // Observable for students
  filteredStudents = new MatTableDataSource<any>([]);
  displayedColumns: string[] = ['name', 'gender', 'age', 'eid', 'course', 'action'];

  courses: string[] = [
    'Computer Science and Engineering',
    'Mechanical Engineering',
    'Electrical and Electronics Engineering',
    'Electronics and Communication Engineering',
    'Civil Engineering'
  ];
  genders: string[] = ['Male', 'Female', 'Other'];

  selectedGender: string = '';
  selectedCourse: string = '';

  constructor(
    private store: Store<StudentState>,
    private router: Router
  ) {
    // Initialize the observable from the store
    this.students$ = this.store.pipe(select(selectAllStudents));
  }

  ngOnInit(): void {
    // Dispatch an action to load students
    this.store.dispatch(StudentActions.loadStudents());

    // Subscribe to students data from the store
    this.students$.subscribe(students => {
      this.filteredStudents.data = students;
    });
  }

  onView(studentId: number): void {
    this.router.navigate(['/view-student', studentId]);
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.filteredStudents.filter = filterValue;
  }

  applyGenderFilter(gender: string): void {
    this.selectedGender = gender;
    this.filterStudents();
  }

  applyCourseFilter(course: string): void {
    this.selectedCourse = course;
    this.filterStudents();
  }

  filterStudents(): void {
    this.filteredStudents.data = this.filteredStudents.data.filter(student => {
      return (
        (!this.selectedGender || student.gender.toLowerCase() === this.selectedGender.toLowerCase()) &&
        (!this.selectedCourse || student.course.toLowerCase() === this.selectedCourse.toLowerCase())
      );
    });
  }
}
