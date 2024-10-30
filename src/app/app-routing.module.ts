import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ViewMyStudentsComponent } from './view-my-students/view-my-students.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { ViewStudentComponent } from './view-student/view-student.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';
import { StudentResolver } from './student.resolver';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TeacherResponsibilityComponent } from './teacher-responsibility/teacher-responsibility.component';
import { StudentBarChartComponent } from './student-bar-chart/student-bar-chart.component';
import { ChatComponent } from './chat/chat.component';
import { MeetingSchedulerComponent } from './meeting-scheduler/meeting-scheduler.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], children: [
    { path: 'students', loadChildren: () => import('./students/students.module').then(m => m.StudentsModule) },
    { path: 'view-my-students', component: ViewMyStudentsComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'change-password', component: PasswordComponent },
    { path: 'goals', loadChildren: () => import('./goals/goals.module').then(m => m.GoalsModule) },
    { path: 'overview', component: TeacherResponsibilityComponent },
    { path: 'chart', component: StudentBarChartComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'view-student/:id', component: ViewStudentComponent ,  resolve: { student: StudentResolver } },
    { path: 'meet', component: MeetingSchedulerComponent },

  ] },
  
  { path: 'view-student/:id', component: ViewStudentComponent ,  resolve: { student: StudentResolver } },
  { path: 'signup', loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule) },
  { path: 'login', component: LoginComponent },
  { path: 'forgot', component: ForgotPasswordComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
