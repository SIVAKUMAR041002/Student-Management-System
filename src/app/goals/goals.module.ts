import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GoalsRoutingModule } from './goals-routing.module';
import { GoalListComponent } from './goal-list/goal-list.component';
import { MatIconModule } from '@angular/material/icon';  // Import MatIconModule
import { MatTableModule } from '@angular/material/table';
import { AddGoalComponent } from './add-goal/add-goal.component';
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
import { UpdateTaskComponent } from './update-task/update-task.component';
import { UpdateGoalComponent } from './update-goal/update-goal.component';
import { PublicGoalsComponent } from './public-goals/public-goals.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    GoalListComponent,
    AddGoalComponent,
    UpdateTaskComponent,
    UpdateGoalComponent,
    PublicGoalsComponent,
    LeaderboardComponent
  ],
  imports: [
    CommonModule,
    GoalsRoutingModule,
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
    MatTooltipModule,
    MatSliderModule,
    MatProgressBarModule
    

  ]
})
export class GoalsModule { }
