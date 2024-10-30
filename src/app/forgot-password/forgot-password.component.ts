import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from '../profile.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {
  username: string = '';
  user: any = {}; 
  oldpassword: string = '';
  password: string = '';
  confirmPassword: string = '';
  hideoldPassword: boolean = true;
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;
  email: string ='';
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

  }

  onSubmit(): void {
    this.profileService.getUser(this.username).subscribe(data => {
      this.user = data[0];
      console.log(this.user);

    // Step 1: Verify old password matches the stored password
    if (this.email !== this.user.email) {
      console.log(this.email);
      console.log(this.user.email);
      alert('Email Id is incorrect');
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
    });
  }

 
  goBack(): void{
    this.router.navigate(['/login']).then(() => {
      history.pushState(null, '', location.href); 
      window.onpopstate = () => {
        history.go(1); 
      };
    });   }

}
