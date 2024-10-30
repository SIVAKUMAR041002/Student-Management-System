import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoalService } from '../../goal.service';

@Component({
  selector: 'app-update-goal',
  templateUrl: './update-goal.component.html',
  styleUrls: ['./update-goal.component.css']
})
export class UpdateGoalComponent implements OnInit {
  goal: any = {};

  constructor(
    private goalService: GoalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.goalService.getGoalById(id).subscribe(data => {
      this.goal = data;
    });
  }

  updateGoal(): void {
    if(this.goal.goalStatus=='Not Started')
      this.goal.pt=0;
    else if(this.goal.goalStatus=='In Progress'){
      this.goal.pt=1;
    }
    else if(this.goal.goalStatus=='Completed'){
      this.goal.pt=2;
    }
    else{
      this.goal.pt=-1;
    }
    this.goalService.updateGoal(this.goal.id, this.goal).subscribe(() => {
      this.router.navigate(['/home/goals/goal-list']); // Navigate to the goals list or another desired route
    });
  }

  resetForm(goalForm: any): void {
    goalForm.resetForm({
      goalName: this.goal.goalName,
      startDate: this.goal.startDate,
      endDate: this.goal.endDate,
      goalStatus: this.goal.goalStatus,
      est: this.goal.est
    });
  }
}
