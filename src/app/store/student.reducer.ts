import { createReducer, on } from '@ngrx/store';
import * as StudentActions from './student.actions';

export interface StudentState {
  students: any[];
}

export const initialState: StudentState = {
  students: []
};

export const studentReducer = createReducer(
  initialState,
  on(StudentActions.addStudentSuccess, (state, { student }) => ({
    ...state,
    students: [...state.students, student]
  })),
  on(StudentActions.loadStudentsSuccess, (state, { students }) => ({
    ...state,
    students: students
  })),
  on(StudentActions.deleteStudentSuccess, (state, { id }) => ({
    ...state,
    students: state.students.filter(student => student.id !== id)
  })),
  on(StudentActions.updateStudentSuccess, (state, { student }) => ({
    ...state,
    students: state.students.map(s => s.id === student.id ? student : s),
    error: null
  })),
  on(StudentActions.updateStudentFailure, (state, { error }) => ({
    ...state,
    error
  })),
  on(StudentActions.deleteStudentSuccess, (state, { id }) => ({
    ...state,
    students: state.students.filter(student => student.id !== id),
    error: null
  })),
  on(StudentActions.deleteStudentFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
