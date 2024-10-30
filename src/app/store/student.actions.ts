import { createAction, props } from '@ngrx/store';

export const addStudent = createAction(
  '[Student] Add Student',
  props<{ student: any }>()
);

export const addStudentSuccess = createAction(
  '[Student] Add Student Success',
  props<{ student: any }>()
);

export const loadStudents = createAction('[Student] Load Students');

export const loadStudentsSuccess = createAction(
  '[Student] Load Students Success',
  props<{ students: any[] }>()
);


export const updateStudent = createAction(
    '[Student] Update Student',
    props<{ student: any }>()
  );
  
  export const updateStudentSuccess = createAction(
    '[Student] Update Student Success',
    props<{ student: any }>()
  );
  
  export const updateStudentFailure = createAction(
    '[Student] Update Student Failure',
    props<{ error: any }>()
  );

  export const deleteStudent = createAction(
    '[Student] Delete Student',
    props<{ id: number }>()
  );
  
  export const deleteStudentSuccess = createAction(
    '[Student] Delete Student Success',
    props<{ id: number }>()
  );
  
  export const deleteStudentFailure = createAction(
    '[Student] Delete Student Failure',
    props<{ error: any }>()
  );