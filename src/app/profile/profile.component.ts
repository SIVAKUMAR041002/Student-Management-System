import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../profile.service';
import { Subscription, interval } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  username: string = '';
  user: any = {};
  isEditing: boolean = false;
  lastUpdateTime: Date | null = null;
  private intervalSubscription: Subscription | undefined;

  profileFields = [
    { label: 'ID ', key: 'id' },
    { label: 'Username ', key: 'username' },
    { label: 'Email ', key: 'email' },
    { label: 'Contact Number ', key: 'contact' },
    { label: 'Address ', key: 'address' },
    { label: 'Designation ', key: 'designation' },
    { label: 'Work Experience (Years) ', key: 'workExperience' },
    { label: 'Year of Joining ', key: 'yearOfJoining' }
  ];

  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.username = params.get('username') || '';
      this.loadUserData();
    });

    // Set up interval to update time every minute
    this.intervalSubscription = interval(60000).subscribe(() => {
      this.updateTimeSinceLastUpdate();
    });
  }

  loadUserData(): void {
    this.profileService.getUser(this.username).subscribe(data => {
      this.user = data[0];
      this.lastUpdateTime = new Date(this.user.lastUpdateTime);
      this.updateTimeSinceLastUpdate(); // Update time immediately on load
    });
  }

  updateProfile(): void {
    const { id, ...updateData } = this.user;

    updateData.lastUpdateTime = new Date().toISOString();

    this.profileService.updateUser({ id, ...updateData }).subscribe(response => {
      alert('Profile updated successfully!');
      this.isEditing = false;
      this.lastUpdateTime = new Date(updateData.lastUpdateTime);
      this.updateTimeSinceLastUpdate(); // Update time after profile update
    });
  }

  editProfile(): void {
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
  }

  goBack(): void {
    history.back();
  }

  // Method to calculate and update time since last update
  private updateTimeSinceLastUpdate(): void {
    if (this.lastUpdateTime) {
      this.lastUpdateTime = new Date(this.lastUpdateTime.getTime() + 60000); // Simulating a time increment for demonstration
      this.cdr.detectChanges(); // Ensure Angular detects the change
    }
  }
}
