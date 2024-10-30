import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentsRoutingModule } from './students-routing.module';
import { JoinStudentComponent } from './join-student/join-student.component';

import { MatIconModule } from '@angular/material/icon';  // Import MatIconModule
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule } from '@angular/forms';
import { EditStudentComponent } from './edit-student/edit-student.component';
import { SchoolStudentComponent } from './school-student/school-student.component';
import { ViewStudenComponent } from './view-studen/view-studen.component';



@NgModule({
  declarations: [
    JoinStudentComponent,
    EditStudentComponent,
    SchoolStudentComponent,
    ViewStudenComponent
  ],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,

    

    
  ]
})
export class StudentsModule { }
