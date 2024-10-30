//login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  hidePassword: boolean = true;

  constructor(private router: Router, private authService: AuthService, private http: HttpClient) {}

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (!this.username || !this.password) {
      alert('Please enter both username and password');
      return;
    }
  
    // Fetch the user by username
    this.http.get<any[]>(`http://localhost:3000/users`, {
      params: {
        username: this.username
      }
    })
    .subscribe(users => {
      if (users.length > 0) {
        const user = users[0];
        // Check if the password matches
        if (user.password === this.password) {
          this.authService.login(user);
          this.router.navigate(['/home/overview']);
        } else {
          alert('Invalid credentials');
        }
      } else {
        alert('Invalid credentials');
      }
    }, error => {
      console.error('Error during authentication', error);
      alert('An error occurred while logging in');
    });
  }
  
}
