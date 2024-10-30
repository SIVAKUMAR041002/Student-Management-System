import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CalendarOptions } from '@fullcalendar/core';
import { HttpClient } from '@angular/common/http';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthService } from '../auth.service';
import { ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar'; // Import MatSnackBar for notifications
import { Console } from 'console';

@Component({
  selector: 'app-meeting-scheduler',
  templateUrl: './meeting-scheduler.component.html',
  styleUrls: ['./meeting-scheduler.component.css']
})
export class MeetingSchedulerComponent implements OnInit {
  meetings: any[] = [];
  displayedColumns: string[] = ['title', 'date', 'startTime', 'duration', 'scheduledBy'];
  isOffCanvasOpen: boolean = false; // Initialize the property

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    events: [],  // Events will be loaded here
    dateClick: this.handleDateClick.bind(this),
    eventClick: this.handleEventClick.bind(this),
    selectable: true, // Allow selecting time slots
    select: this.handleSelect.bind(this), // Handle time slot selection
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridDay'
    },
    views: {
      timeGridDay: {
        titleFormat: { year: 'numeric', month: 'short', day: 'numeric' },
        slotDuration: '00:30:00', // Time slice duration (e.g., 30 minutes)
        slotLabelInterval: '01:00:00' // Label interval for each slot
      }
    }
  };
  

  @ViewChild('sidenav') sidenav!: MatSidenav;
  selectedMeeting: any;
  meetingForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private http: HttpClient,
    private cdr: ChangeDetectorRef, // Inject ChangeDetectorRef
    private snackBar: MatSnackBar // Inject MatSnackBar

  ) {
    const username = this.authService.getUser().username;

    this.meetingForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      duration: ['', Validators.required],
      description: [''],
      scheduledBy: [username]  // Initialize with the logged-in user's username
    });
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  loadEvents(): void {
    this.http.get('http://localhost:3000/meetings').subscribe((events: any) => {
      this.meetings = events; // Store the events for the off-canvas table
      this.calendarOptions.events = events.map((event: any) => ({
        id: event.id,  // Include the meeting ID
        title: event.title,
        start: event.date,
        extendedProps: {
          scheduledBy: event.scheduledBy,
          description: event.description,
          duration: event.duration,
          startTime: event.startTime // Ensure this is included

        },
      }));
    });
  }

  handleDateClick(arg: any): void {
    this.selectedMeeting = null;

    const username = this.authService.getUser().username;

    this.meetingForm.reset();
    this.meetingForm.patchValue({ 
      date: arg.dateStr,
      scheduledBy: username  // Populate the form field with the current username
    });

    this.sidenav.open();
  }

  handleEventClick(arg: any): void {
    this.selectedMeeting = {
      id: arg.event.id,  // Set the id of the meeting
      title: arg.event.title,
      scheduledBy: arg.event.extendedProps.scheduledBy,  // Include scheduledBy in the meeting details
      date: arg.event.startStr,
      description: arg.event.extendedProps.description,
      duration: arg.event.extendedProps.duration,
      startTime: arg.event.extendedProps.startTime
    };
    this.sidenav.open();
  }

  saveMeeting(): void {
    const newEvent = this.meetingForm.value;
    this.http.post('http://localhost:3000/meetings', newEvent).subscribe(() => {
      this.loadEvents();  // Reload events after adding a new one
      this.sidenav.close();
    });
  }

  close(): void {
    this.sidenav.close();
    this.cdr.detectChanges(); // Trigger change detection
  }
  
  handleSelect(arg: any): void {
    this.selectedMeeting = null; // Clear selected meeting
    
    const username = this.authService.getUser().username;
    
    this.meetingForm.reset();
    this.meetingForm.patchValue({
      date: arg.startStr.split('T')[0], // Set date part
      startTime: arg.startStr.split('T')[1].substring(0, 5), // Set time part (HH:MM)
      scheduledBy: username
    });
  
    this.sidenav.open();
  }
  deleteMeeting(): void {
    if (this.selectedMeeting && this.selectedMeeting.id) {
      const meetingId = this.selectedMeeting.id;
      const loggedInUser = this.authService.getUser().username;
  
      if (this.selectedMeeting.scheduledBy === loggedInUser) {
        this.http.delete(`http://localhost:3000/meetings/${meetingId}`).subscribe(
          () => {
            this.loadEvents();  // Reload events after deletion
            this.selectedMeeting = null; // Clear selected meeting
            this.sidenav.close();
            this.snackBar.open('Meeting deleted successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'top', // Position at the top
              horizontalPosition: 'center' // Centered horizontally
            });
          },
          error => {
            console.error('Error deleting meeting:', error);
            this.snackBar.open('Error deleting meeting', 'Close', {
              duration: 3000,
              verticalPosition: 'top', // Position at the top
              horizontalPosition: 'center' // Centered horizontally
            });
          }
        );
      } else {
        this.snackBar.open('You can only delete meetings that you scheduled.', 'Close', {
          duration: 3000,
          verticalPosition: 'top', // Position at the top
          horizontalPosition: 'center' // Centered horizontally
        });
      }
    } else {
      this.snackBar.open('Meeting not found or not selected.', 'Close', {
        duration: 3000,
        verticalPosition: 'top', // Position at the top
        horizontalPosition: 'center' // Centered horizontally
      });
    }
  }
  
  openOffCanvas(): void {
    const offCanvas = document.getElementById('offCanvas');
    offCanvas!.classList.add('open');
  }

  closeOffCanvas(): void {
    const offCanvas = document.getElementById('offCanvas');
    offCanvas!.classList.remove('open');
  }
  sopenOffCanvas(): void {
    this.isOffCanvasOpen = true;
  }

  scloseOffCanvas(): void {
    this.isOffCanvasOpen = false;
  }
}
