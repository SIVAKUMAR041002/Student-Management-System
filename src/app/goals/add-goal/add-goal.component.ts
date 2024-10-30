import { Component } from '@angular/core';
import { GoalService } from '../../goal.service';
import { AuthService } from '../../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-goal',
  templateUrl: './add-goal.component.html',
  styleUrl: './add-goal.component.css'
})
export class AddGoalComponent {
  
  goal = { goalName: '', startDate: '', endDate: '', goalStatus: '', addedBy: '', tasks: [], est: 0, rt: 0, pt:0 };
  statuses = ['Not Started', 'In Progress', 'Completed', 'Suspended'];

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private goalService: GoalService) {}

  onSubmit(): void {
    this.goal.addedBy = this.authService.getUser().username;
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
    this.goal.rt=this.goal.est;
    this.goalService.addGoal(this.goal).subscribe(() => {
      alert('Goal Set successfully');
      this.goal = { goalName: '', startDate: '', endDate: '', goalStatus: '', addedBy:'', tasks: [], est: 0, rt: 0,pt:0 };
      this.router.navigate(['/home/goals/goal-list']);

    });
  }

  resetForm(form: any): void {
    form.resetForm();
    this.goal = { goalName: '', startDate: '', endDate: '', goalStatus: '', addedBy:'', tasks: [], est: 0, rt:0,pt:0 };
  }
}
