import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JoinStudentComponent } from './join-student/join-student.component';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { SchoolStudentComponent } from './school-student/school-student.component';
import { StudentResolver } from '../student.resolver';
import { ViewStudenComponent } from './view-studen/view-studen.component';
const routes: Routes = [
  { path: 'join-student', component: JoinStudentComponent },
  { path: 'edit-student/:id', component: EditStudentComponent },
  { path: 'school-students', component: SchoolStudentComponent },
  { path: 'view-student/:id', component: ViewStudenComponent, resolve: { student: StudentResolver } },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
