import { Component } from '@angular/core';

@Component({
  selector: 'app-teacher-responsibility',
  templateUrl: './teacher-responsibility.component.html',
  styleUrls: ['./teacher-responsibility.component.css']
})
export class TeacherResponsibilityComponent {
  responsibilities = [
    'Responsibility 1',
    'Responsibility 2',
    'Responsibility 3',
    'Responsibility 4',
    'Responsibility 5'
  ];
}
