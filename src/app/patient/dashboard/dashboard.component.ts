// src/app/patient/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class PatientDashboardComponent implements OnInit {
  appointments: any[] = [];
  loading = true;
  patientId: number;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.patientId = this.auth.getProfileId();
  }

  ngOnInit(): void { this.loadAppointments(); }

  loadAppointments(): void {
    this.http.get(`http://localhost:5199/api/appointment/my/${this.patientId}`)
      .subscribe({
        next: (data: any) => { this.appointments = data; this.loading = false; },
        error: () => { this.loading = false; }
      });
  }

  cancelAppointment(id: number): void {
    Swal.fire({
      title: 'Cancel Appointment?',
      text: 'This action cannot be undone.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#dc3545',
      confirmButtonText: 'Yes, cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.http.put(
          `http://localhost:5199/api/appointment/${id}/status`,
          { status: 'Cancelled' }
        ).subscribe({
          next: () => {
            Swal.fire('Cancelled!', 'Your appointment has been cancelled.', 'success');
            this.loadAppointments();
          },
          error: () => Swal.fire('Error', 'Failed to cancel appointment.', 'error')
        });
      }
    });
  }

  logout(): void { this.auth.logout(); }

  getStatusClass(status: string): string {
    const map: { [k: string]: string } = {
      'Pending': 'badge-warning', 'Confirmed': 'badge-success',
      'Cancelled': 'badge-danger', 'Completed': 'badge-info', 'NoShow': 'badge-secondary'
    };
    return map[status] || 'badge-secondary';
  }
}