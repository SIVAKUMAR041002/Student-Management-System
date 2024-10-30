import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  hoverState: any = {
    myProfile: false,
    addStudent: false,
    viewMyStudents: false,
    viewAllStudents: false,
    changePassword: false,
    setGoals: false,
    goalsList: false,
    publicGoals: false,
    chart: false,
    chat: false,
    lb: false,
    meet: false

  };
  username: string = '';

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.username = this.authService.getUser().username;
    this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        if (this.authService.isAuthenticated() && event.url === '/login') {
          this.router.navigate(['/home']); 
        }
      }
    });
  }

  setHoverState(item: string, state: boolean) {
    this.hoverState[item] = state;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']).then(() => {
      history.pushState(null, '', location.href); 
      window.onpopstate = () => {
        history.go(1); 
      };
    });
  }
}
