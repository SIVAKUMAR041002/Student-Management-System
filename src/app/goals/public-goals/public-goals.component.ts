import { Component, OnInit } from '@angular/core';
import { GoalService } from '../../goal.service';

@Component({
  selector: 'app-public-goals',
  templateUrl: './public-goals.component.html',
  styleUrl: './public-goals.component.css'
})
export class PublicGoalsComponent implements OnInit {
  constructor(private goalService: GoalService){}

  goals: any[] = [];

  ngOnInit(): void {
    this.goalService.getGoal().subscribe(data => {
      this.goals=data;
      console.log(data);
    });
  }

  getTimeAgo(task: any): string {
    const now = new Date().getTime();
    const taskTime = new Date(task.createdAt).getTime();
    const diffInMilliseconds = now - taskTime;

    const diffInMinutes = Math.floor(diffInMilliseconds / 60000);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMinutes < 1) {
      return 'Just now';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
    }
  }
  getTimeUtilizationPercentage(goal: any): number {
    const spentTime = goal.est - goal.rt;; // Assuming you have a property for spent time
    const estTime = goal.est;
    return (spentTime / estTime) * 100;
  }
}
