import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-student-detail-dialog',
  templateUrl: './student-detail-dialog.component.html',
  styleUrls: ['./student-detail-dialog.component.css']
})
export class StudentDetailDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<StudentDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  onEdit(): void {
    // Logic for editing student details
    this.dialogRef.close();
  }

  onDelete(): void {
    // Logic for deleting student
    this.dialogRef.close();
  }

  onView(): void {
    // Logic for deleting student
    this.dialogRef.close();
  }
}
