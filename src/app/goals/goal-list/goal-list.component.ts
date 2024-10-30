import { Component, OnInit, OnDestroy } from '@angular/core';
import { GoalService } from '../../goal.service';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-goal-list',
  templateUrl: './goal-list.component.html',
  styleUrls: ['./goal-list.component.css']
})
export class GoalListComponent implements OnInit, OnDestroy {
  goals: any[] = [];
  private intervalSubscription: Subscription | undefined;

  constructor(
    private goalService: GoalService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const username = this.authService.getUser().username;
    this.goalService.getGoalsByUser(username).subscribe(data => {
      this.goals = data;
      console.log(this.goals);
    });

    // Set up interval to update time every minute
    this.intervalSubscription = interval(60000).subscribe(() => {
      this.goals = [...this.goals]; // Trigger change detection
    });
  }

  ngOnDestroy(): void {
    // Clean up interval when component is destroyed
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  onDelete(id: any): void {
    this.goalService.deleteGoal(id).subscribe(() => {
      this.goals = this.goals.filter(goal => goal.id !== id);
    });
  }

  onUpdateTask(id: any): void {
    this.router.navigate(['/home/goals/update-task', id]);
  }

  onUpdateGoal(id: any): void {
    this.router.navigate(['/home/goals/update-goal', id]);
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
  getCreationTime(task: any): string {
    return new Date(task.createdAt).toLocaleString();
  }

  getProgressColor(goal: any): string {
    return '#4caf50'; // Example shade of green
  }
  getTimeUtilizationPercentage(goal: any): number {
    const spentTime = goal.est - goal.rt; // Assuming goal.est is estimated time and goal.rt is remaining time
    const estTime = goal.est;
    return (spentTime / estTime) * 100;
  }
  
  getProgressBarValue(goal: any): number {
    const percentage = this.getTimeUtilizationPercentage(goal);
    return percentage > 100 ? 100 : percentage; // Cap at 100% for the first progress bar
  }
  
  getOverflowValue(goal: any): number {
    const percentage = this.getTimeUtilizationPercentage(goal);
    return percentage > 100 ? percentage - 100 : 0; // Show only overflow (x%) for the second progress bar
  }
  
}
