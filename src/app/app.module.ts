import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ViewMyStudentsComponent } from './view-my-students/view-my-students.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { StudentService } from './student.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { ViewStudentComponent } from './view-student/view-student.component';
import { ProfileComponent } from './profile/profile.component';
import { PasswordComponent } from './password/password.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { TimeSincePipe } from './time-since.pipe';
import { StudentsModule } from './students/students.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatExpansionModule } from '@angular/material/expansion';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { studentReducer } from './store/student.reducer';
import { StudentEffects } from './store/student.effects';
import { ToastrModule } from 'ngx-toastr';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StudentDetailDialogComponent } from './student-detail-dialog/student-detail-dialog.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TeacherResponsibilityComponent } from './teacher-responsibility/teacher-responsibility.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgChartsModule } from 'ng2-charts';
import { StudentBarChartComponent } from './student-bar-chart/student-bar-chart.component';
import { ChatComponent } from './chat/chat.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { StudentOffCanvasComponent } from './student-off-canvas/student-off-canvas.component';
import { MeetingSchedulerComponent } from './meeting-scheduler/meeting-scheduler.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ViewMyStudentsComponent,
    ViewStudentComponent,
    ProfileComponent,
    PasswordComponent,
    ForgotPasswordComponent,
    TimeSincePipe,
    StudentDetailDialogComponent,
    ConfirmationDialogComponent,
    TeacherResponsibilityComponent,
    StudentBarChartComponent,
    ChatComponent,
    StudentOffCanvasComponent,
    MeetingSchedulerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    StudentsModule,
    DragDropModule,
    MatExpansionModule,
    NgbDropdown,
    MatTooltipModule,
    MatGridListModule,
    NgChartsModule,
    MatToolbarModule,
    FullCalendarModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({ // ToastrModule added
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
    StoreModule.forRoot({ students: studentReducer }),
    EffectsModule.forRoot([StudentEffects])
  ],
  providers: [AuthGuard, AuthService, StudentService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
