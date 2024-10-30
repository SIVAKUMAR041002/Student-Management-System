import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GoalService } from '../../goal.service';

@Component({
  selector: 'app-update-task',
  templateUrl: './update-task.component.html',
  styleUrls: ['./update-task.component.css']
})
export class UpdateTaskComponent implements OnInit {
  goal: any = {};
  newTask: { taskName: string; taskTime: number } = { taskName: '', taskTime: 0 };
  displayedColumns: string[] = ['taskName', 'taskTime'];
  totalTaskTime: number = 0;

  constructor(
    private goalService: GoalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.goalService.getGoalById(id).subscribe(data => {
      this.goal = data;
      this.calculateTotalTaskTime(); // Calculate total task time when the component initializes
    });
  }

  addTask(): void {
    if (this.newTask.taskName && this.newTask.taskTime) {
      const currentTime = new Date(); // Get the current timestamp
      this.goal.tasks.push({ 
        ...this.newTask, 
        createdAt: currentTime 
      });
  
      this.newTask = { taskName: '', taskTime: 0 }; // Reset the task object
      this.calculateTotalTaskTime(); // Recalculate task time
  
      this.goalService.updateGoal(this.goal.id, this.goal).subscribe(() => {
        this.router.navigate(['/home/goals/goal-list']);
      });
    }
  }
  
  calculateTotalTaskTime(): void {
    this.totalTaskTime = this.goal.tasks.reduce((sum: number, task: { taskTime: number }) => sum + task.taskTime, 0);
    this.goal.rt = this.goal.est-this.totalTaskTime;
  }
}
