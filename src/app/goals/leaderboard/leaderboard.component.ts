import { Component, OnInit } from '@angular/core';
import { GoalService } from '../../goal.service'; // Adjust the path as needed
import { AuthService } from '../../auth.service'; // Adjust the path as needed
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {
  leaderboard: { addedBy: string, totalPoints: number }[] = [];
  displayedColumns: string[] = ['position', 'addedBy', 'totalPoints', 'rating'];
  userRank: number | null = null;

  constructor(private goalService: GoalService, private authService: AuthService) {}

  ngOnInit(): void {
    this.loadLeaderboard();
  }

  loadLeaderboard(): void {
    this.goalService.getGoal().pipe(
      map(goals => {
        const userPoints: { [key: string]: number } = {};
        goals.forEach(goal => {
          if (userPoints[goal.addedBy] === undefined) {
            userPoints[goal.addedBy] = 0;
          }
          userPoints[goal.addedBy] += goal.pt;
        });

        const leaderboard = Object.keys(userPoints).map(user => ({
          addedBy: user,
          totalPoints: userPoints[user]
        })).sort((a, b) => b.totalPoints - a.totalPoints);

        // Determine the rank of the current user
        const username = this.authService.getUser().username;
        this.userRank = leaderboard.findIndex(user => user.addedBy === username) + 1;

        return leaderboard;
      })
    ).subscribe(data => this.leaderboard = data);
  }

  getRankCardClass(): string {
    if (this.userRank === null) {
      return ''; // Return default class if userRank is null
    } else if (this.userRank === 0) {
      return 'red';
    } else if (this.userRank > 3) {
      return 'blue';
    }
    return ''; // No additional class for ranks between 1 and 3
  }
  

  getRankIcon(): string {
    if (this.userRank === 0) {
      return 'warning'; // Use a danger icon for rank 0
    }
    return 'star'; // Default star icon
  }

  getRankMessage(): string {
    if (this.userRank === 0) {
      return 'Sorry, you haven’t started your progress yet.';
    }
    return `Congratulations! Your current rank is ${this.userRank}!`;
  }

  getRating(totalPoints: number): string {
    if (this.leaderboard.length === 0) {
      return ''; // No rating if the leaderboard is empty
    }
    
    // Get the highest total points in the leaderboard (first rank)
    const highestPoints = this.leaderboard[0].totalPoints;
    
    // Calculate the rating as a fraction of the highest points
    const rating = Math.round((totalPoints / highestPoints) * 5);
    
    // Create the star rating string
    return '★'.repeat(rating) + '☆'.repeat(5 - rating);
  }
  
}
