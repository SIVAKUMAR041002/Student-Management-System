import { createFeatureSelector, createSelector } from '@ngrx/store';
import { StudentState } from './student.reducer';

export const selectStudentState = createFeatureSelector<StudentState>('students');

export const selectAllStudents = createSelector(
  selectStudentState,
  (state: StudentState) => state.students
);
