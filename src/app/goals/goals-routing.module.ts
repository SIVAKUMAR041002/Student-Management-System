import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GoalListComponent } from './goal-list/goal-list.component';
import { AddGoalComponent } from './add-goal/add-goal.component';
import { UpdateTaskComponent } from './update-task/update-task.component';
import { UpdateGoalComponent } from './update-goal/update-goal.component';
import { PublicGoalsComponent } from './public-goals/public-goals.component';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';

const routes: Routes = [
  { path: 'goal-list', component: GoalListComponent },
  { path: 'add-goal', component: AddGoalComponent },
  { path: 'update-task/:id', component: UpdateTaskComponent },
  { path: 'update-goal/:id', component: UpdateGoalComponent },
  { path: 'public-goals', component: PublicGoalsComponent },
  { path: 'leaders-board', component: LeaderboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GoalsRoutingModule { }
