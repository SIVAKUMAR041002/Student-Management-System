import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { StudentService } from '../student.service';

@Component({
  selector: 'app-student-bar-chart',
  templateUrl: './student-bar-chart.component.html',
  styleUrls: ['./student-bar-chart.component.css']
})
export class StudentBarChartComponent implements OnInit {
  displayedColumns: string[] = ['name', 'age', 'course'];

  public barChartData: ChartConfiguration['data'] = { labels: [], datasets: [] };
  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {
        stacked: true,
        title: {
          display: true,
          text: 'Age Groups'
        }
      },
      y: {
        stacked: true,
        min: 0,
        title: {
          display: true,
          text: 'Student Count'
        }
      }
    }
  };
  public barChartType: ChartType = 'bar';

  public pieChartData: ChartConfiguration['data'] = { labels: [], datasets: [] };
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
    onClick: (event, elements) => this.onPieChartClick(event, elements)
  };
  public pieChartType: ChartType = 'pie';

  public isOffCanvasOpen = false;
  public selectedStudents: any[] = [];
  public selectedCourse: string = ''; // New property to store selected course

  constructor(private studentService: StudentService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadBarChartData();
    this.loadPieChartData();
  }

  private loadBarChartData() {
    this.studentService.getAllStudents().subscribe(students => {
      const ageGroups: string[] = ['15-20', '20-25', '25-30'];
      const departments: string[] = [
        'Computer Science and Engineering',
        'Mechanical Engineering',
        'Electrical and Electronics Engineering',
        'Electronics and Communication Engineering',
        'Civil Engineering'
      ];

      const ageGroupData: { [key in typeof ageGroups[number]]: { [key in typeof departments[number]]: number } } = {
        '15-20': {} as { [key in typeof departments[number]]: number },
        '20-25': {} as { [key in typeof departments[number]]: number },
        '25-30': {} as { [key in typeof departments[number]]: number }
      };

      departments.forEach(department => {
        ageGroups.forEach(ageGroup => {
          ageGroupData[ageGroup][department] = 0;
        });
      });

      students.forEach((student: any) => {
        const age = student.age;
        const department = student.course as typeof departments[number];

        let ageGroup: typeof ageGroups[number];
        if (age >= 15 && age < 20) {
          ageGroup = '15-20';
        } else if (age >= 20 && age < 25) {
          ageGroup = '20-25';
        } else if (age >= 25 && age < 30) {
          ageGroup = '25-30';
        } else {
          return; // Skip students outside of the defined age groups
        }

        if (departments.includes(department)) {
          ageGroupData[ageGroup][department]++;
        }
      });

      this.barChartData = {
        labels: ageGroups,
        datasets: departments.map(department => ({
          label: department,
          data: ageGroups.map(ageGroup => ageGroupData[ageGroup][department]),
          backgroundColor: this.getColorForDepartment(department)
        }))
      };
    });
  }

  private loadPieChartData() {
    this.studentService.getAllStudents().subscribe(students => {
      const departmentCount: { [key: string]: number } = {};

      students.forEach(student => {
        const department = student.course;
        if (!departmentCount[department]) {
          departmentCount[department] = 0;
        }
        departmentCount[department]++;
      });

      this.pieChartData = {
        labels: Object.keys(departmentCount),
        datasets: [{
          data: Object.values(departmentCount),
          backgroundColor: Object.keys(departmentCount).map(department => this.getColorForDepartment(department))
        }]
      };
    });
  }

  private onPieChartClick(event: any, elements: any) {
    if (elements && elements.length) {
      const clickedIndex = elements[0].index;
      this.selectedCourse = this.pieChartData.labels![clickedIndex] as string; // Set selected course
  
      this.studentService.getStudentsByCourse(this.selectedCourse).subscribe(students => {
        this.selectedStudents = students;
        this.isOffCanvasOpen = true;
        this.changeDetectorRef.detectChanges(); // Force change detection
      });
    }
  }

  closeOffCanvas() {
    this.isOffCanvasOpen = false; // Close the off-canvas panel
  }

  private getColorForDepartment(department: string): string {
    const colors: { [key: string]: string } = {
      'Computer Science and Engineering': '#FF6384',
      'Mechanical Engineering': '#36A2EB',
      'Electrical and Electronics Engineering': '#FFCE56',
      'Electronics and Communication Engineering': '#4BC0C0',
      'Civil Engineering': '#9966FF'
    };
    return colors[department] || '#000000'; // Default color if department is not found
  }
}
