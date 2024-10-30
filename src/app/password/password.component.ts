import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../profile.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  username: string = '';
  user: any = {}; 
  oldpassword: string = '';
  password: string = '';
  confirmPassword: string = '';
  hideoldPassword: boolean = true;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
 
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private profileService: ProfileService,
    private router: Router,
    private authService: AuthService
  ) { }

  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.hidePassword = !this.hidePassword;
    } else if (field === 'confirmPassword') {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    } else if (field === 'oldpassword') {
      this.hideoldPassword = !this.hideoldPassword;
    }
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.username = params.get('username') || '';
      this.loadUserData();
    });
  }

  loadUserData(): void {
    this.profileService.getUser(this.username).subscribe(data => {
      this.user = data[0];
      console.log(this.user);
    });
  }

  onSubmit(): void {
    // Step 1: Verify old password matches the stored password
    if (this.oldpassword !== this.user.password) {
      alert('Old password is incorrect');
      return;
    }

    // Step 2: Ensure new password matches confirm password
    if (this.password !== this.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    // Step 3: Update the user's password
    const updatedUser = { ...this.user, password: this.password };
    this.profileService.updateUser(updatedUser).subscribe(
      response => {
        alert('Password changed successfully');
        this.authService.logout();
        this.router.navigate(['/login']).then(() => {
          history.pushState(null, '', location.href); 
          window.onpopstate = () => {
            history.go(1); 
          };
        });      },
      error => {
        alert('Failed to update password');
        console.error(error);
      }
    );
  }
  goBack(): void{
    history.back();
  }
}
