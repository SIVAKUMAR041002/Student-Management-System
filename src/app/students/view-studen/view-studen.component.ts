import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../student.service';

@Component({
  selector: 'app-view-studen',
  templateUrl: './view-studen.component.html',
  styleUrl: './view-studen.component.css'
})
export class ViewStudenComponent {
  student: any = {};

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.student = this.route.snapshot.data['student'];
  }
  goBack(): void {
    history.back();
  }
}
