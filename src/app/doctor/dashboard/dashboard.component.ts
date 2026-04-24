// src/app/doctor/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AuthService } from '../../core/services/auth.service';

const API = 'http://localhost:5199/api';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DoctorDashboardComponent implements OnInit {
  appointments: any[] = [];
  doctorId: number;

  constructor(private http: HttpClient, private auth: AuthService) {
    this.doctorId = this.auth.getProfileId();
  }

  ngOnInit(): void { this.loadAppointments(); }

  loadAppointments(): void {
    this.http.get(`${API}/appointment/doctor/${this.doctorId}`)
      .subscribe((data: any) => this.appointments = data);
  }

  updateStatus(id: number, status: string): void {
    const messages: { [k: string]: string } = {
      'Confirmed': 'Accept this appointment?',
      'Cancelled': 'Reject this appointment?',
      'Completed': 'Mark as completed?',
      'NoShow':    'Mark patient as no-show?'
    };
    Swal.fire({
      title: messages[status], icon: 'question',
      showCancelButton: true, confirmButtonText: 'Yes'
    }).then(r => {
      if (r.isConfirmed) {
        this.http.put(`${API}/appointment/${id}/status`, { status })
          .subscribe({
            next: () => { Swal.fire('Done!', `Status set to ${status}`, 'success'); this.loadAppointments(); },
            error: (e) => Swal.fire('Error', e.error?.message, 'error')
          });
      }
    });
  }

  logout(): void { this.auth.logout(); }

  get pending():   number { return this.appointments.filter(a => a.status === 'Pending').length; }
  get confirmed(): number { return this.appointments.filter(a => a.status === 'Confirmed').length; }
  get completed(): number { return this.appointments.filter(a => a.status === 'Completed').length; }
}

