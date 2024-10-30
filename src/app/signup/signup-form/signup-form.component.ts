import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  hidePassword: boolean = true;
  hideConfirmPassword: boolean = true;

  minLengthValid: boolean = false;
  upperCaseValid: boolean = false;
  numberValid: boolean = false;
  specialCharValid: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  togglePasswordVisibility(field: string): void {
    if (field === 'password') {
      this.hidePassword = !this.hidePassword;
    } else if (field === 'confirmPassword') {
      this.hideConfirmPassword = !this.hideConfirmPassword;
    }
  }

  checkPasswordStrength(): void {
    this.minLengthValid = this.password.length >= 8;
    this.upperCaseValid = /[A-Z]/.test(this.password);
    this.numberValid = /[0-9]/.test(this.password);
    this.specialCharValid = /[!@#$%^&*(),.?":{}|<>]/.test(this.password);
  }

  onSubmit(): void {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    this.http.get<any[]>('http://localhost:3000/users').subscribe(users => {
      const userExists = users.some(user => user.username === this.username);
      
      if (userExists) {
        alert('Username already exists');
        return;
      }

      this.http.post('http://localhost:3000/users', {
        username: this.username,
        password: this.password
      }).subscribe(() => {
        alert('Signup successful');
        this.router.navigate(['/login']);
      });
    });
  }
}
