// src/app/patient/book-appointment/book-appointment.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
 
const API = 'http://localhost:5199/api';
 
@Component({
  selector: 'app-book-appointment',
  templateUrl: './book-appointment.component.html',
  styleUrls: ['./book-appointment.component.scss']
})
export class BookAppointmentComponent implements OnInit {
  specializations: any[] = [];
  specializationGroups: { [key: string]: any[] } = {};
  availableDoctors: any[] = [];
 
  selectedSpec = 0;
  selectedMode = '';
  selectedDate = '';
  selectedDoctor: any = null;
  selectedTime = '';
  notes = '';
  loading = false;
  searching = false;
  noAvailability = false;
 
  timeSlots = [
    '09:00','09:30','10:00','10:30','11:00','11:30',
    '14:00','14:30','15:00','15:30','16:00','16:30','17:00'
  ];
 
  minDate: string;
 
  constructor(private http: HttpClient, public auth: AuthService,
              private router: Router) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }
 
  ngOnInit(): void {
    this.http.get(`${API}/specialization`).subscribe({
      next: (data: any) => {
        this.specializations = data;
        // Group by category
        this.specializationGroups = {};
        data.forEach((s: any) => {
          if (!this.specializationGroups[s.category]) {
            this.specializationGroups[s.category] = [];
          }
          this.specializationGroups[s.category].push(s);
        });
      }
    });
  }
 
  get groupKeys(): string[] {
    return Object.keys(this.specializationGroups).sort();
  }
 
  searchDoctors(): void {
    if (!this.selectedSpec || !this.selectedMode || !this.selectedDate) {
      Swal.fire('Missing Fields', 'Please select specialty, mode, and date.', 'warning');
      return;
    }
    this.searching = true;
    this.selectedDoctor = null;
    this.availableDoctors = [];
 
    this.http.get(`${API}/appointment/available-doctors`, {
      params: {
        specializationId: this.selectedSpec.toString(),
        mode: this.selectedMode,
        date: this.selectedDate
      }
    }).subscribe({
      next: (data: any) => {
        this.availableDoctors = data;
        this.noAvailability = data.length === 0;
        this.searching = false;
      },
      error: () => { this.searching = false; }
    });
  }
 
  selectDoctor(doc: any): void {
    this.selectedDoctor = doc;
    this.selectedTime = '';
  }
 
  isSlotBooked(slot: string): boolean {
    return this.selectedDoctor?.bookedSlots?.includes(slot) ?? false;
  }
 
  book(): void {
    if (!this.selectedDoctor || !this.selectedTime) {
      Swal.fire('Select Time Slot', 'Please select a doctor and time slot.', 'warning');
      return;
    }
    this.loading = true;
    const payload = {
      patientId: this.auth.getProfileId(),
      doctorId: this.selectedDoctor.doctorId,
      specializationId: Number(this.selectedSpec),
      appointmentDate: this.selectedDate,
      appointmentTime: this.selectedTime,
      mode: this.selectedMode,
      notes: this.notes
    };
 
    this.http.post(`${API}/appointment/book`, payload).subscribe({
      next: () => {
        this.loading = false;
        Swal.fire({
          icon: 'success', title: 'Appointment Booked!',
          text: 'A confirmation email has been sent to you.',
          confirmButtonText: 'View My Appointments'
        }).then(() => this.router.navigate(['/patient/my-appointments']));
      },
      error: (err) => {
        this.loading = false;
        Swal.fire('Booking Failed', err.error?.message || 'Something went wrong.', 'error');
      }
    });
  }
}

