import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { StudentService } from '../student.service';
import * as StudentActions from './student.actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class StudentEffects {
  constructor(
    private actions$: Actions,
    private studentService: StudentService
  ) {}

  addStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.addStudent),
      mergeMap(action =>
        this.studentService.addStudent(action.student).pipe(
          map(student => StudentActions.addStudentSuccess({ student })),
          catchError(() => of({ type: '[Student] Add Student Failed' }))
        )
      )
    )
  );

  loadStudents$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.loadStudents),
      mergeMap(() =>
        this.studentService.getAllStudents().pipe(
          map(students => StudentActions.loadStudentsSuccess({ students })),
          catchError(() => of({ type: '[Student] Load Students Failed' }))
        )
      )
    )
  );

  deleteStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.deleteStudent),
      mergeMap(action =>
        this.studentService.deleteStudent(action.id).pipe(
          map(() => StudentActions.deleteStudentSuccess({ id: action.id })),
          catchError(error => of(StudentActions.deleteStudentFailure({ error })))
        )
      )
    )
  );
  
  updateStudent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(StudentActions.updateStudent),
      mergeMap(action =>
        this.studentService.updateStudent(action.student).pipe(
          map(student => StudentActions.updateStudentSuccess({ student })),
          catchError(error => of(StudentActions.updateStudentFailure({ error })))
        )
      )
    )
  );
}
