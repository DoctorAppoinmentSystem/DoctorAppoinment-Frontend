// src/app/patient/search-doctors/search-doctors.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/services/auth.service';

const API = 'http://localhost:5199/api';

@Component({
  selector: 'app-search-doctors',
  templateUrl: './search-doctors.component.html',
  styleUrls: ['./search-doctors.component.scss']
})
export class SearchDoctorsComponent implements OnInit {
  specializations: any[] = [];
  availableDoctors: any[] = [];
  selectedSpec   = 0;
  selectedMode   = '';
  selectedDate   = '';
  selectedDoctor: any = null;
  selectedTime   = '';
  notes          = '';
  loading        = false;
  noAvailability = false;

  timeSlots = [
    '09:00','09:30','10:00','10:30','11:00','11:30',
    '14:00','14:30','15:00','15:30','16:00','16:30','17:00'
  ];

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.http.get(`${API}/specialization`)
      .subscribe((data: any) => this.specializations = data);
  }

  
// Add these to search-doctors.component.ts (inside the class)
 
  today = new Date().toISOString().split('T')[0];
 
  getGroups(): string[] {
    const cats = [...new Set(this.specializations.map((s: any) => s.category))];
    return cats.sort();
  }
 
  getByCategory(cat: string): any[] {
    return this.specializations.filter((s: any) => s.category === cat);
  }


  searchDoctors(): void {
    if (!this.selectedSpec || !this.selectedMode || !this.selectedDate) {
      Swal.fire('Missing Fields', 'Please select specialty, mode, and date.', 'warning');
      return;
    }
    this.loading = true;
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
        this.loading = false;
      },
      error: () => { this.loading = false; }
    });
  }

  selectDoctor(doctor: any): void {
    this.selectedDoctor = doctor;
    this.selectedTime = '';
  }

  isSlotBooked(slot: string): boolean {
    return this.selectedDoctor?.bookedSlots?.includes(slot) ?? false;
  }

  bookAppointment(): void {
    if (!this.selectedDoctor || !this.selectedTime) {
      Swal.fire('Select Time', 'Please select a doctor and time slot.', 'warning');
      return;
    }

    const payload = {
      patientId:        this.auth.getProfileId(),
      doctorId:         this.selectedDoctor.doctorId,
      specializationId: this.selectedSpec,
      appointmentDate:  this.selectedDate,
      appointmentTime:  this.selectedTime,
      mode:             this.selectedMode,
      notes:            this.notes
    };

    this.http.post(`${API}/appointment/book`, payload).subscribe({
      next: () => {
        Swal.fire({
          icon: 'success', title: 'Appointment Booked!',
          text: 'A confirmation email has been sent to you.',
          confirmButtonText: 'View My Appointments'
        }).then(() => this.router.navigate(['/patient/my-appointments']));
      },
      error: (err) => Swal.fire('Booking Failed',
        err.error?.message || 'Something went wrong.', 'error')
    });
  }
}
