import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-student-off-canvas',
  templateUrl: './student-off-canvas.component.html',
  styleUrls: ['./student-off-canvas.component.css']
})
export class StudentOffCanvasComponent {
  @Input() students: any[] = [];

  close(): void {
    const offCanvas = document.querySelector('app-student-off-canvas') as HTMLElement;
    if (offCanvas) {
      offCanvas.style.display = 'none';
    }
  }
}
