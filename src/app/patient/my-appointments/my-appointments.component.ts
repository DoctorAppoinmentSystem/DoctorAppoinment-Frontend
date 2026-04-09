// src/app/patient/my-appointments/my-appointments.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
 
const API = 'http://localhost:5199/api';
 
@Component({
  selector: 'app-my-appointments',
  templateUrl: './my-appointments.component.html',
  styleUrls: ['./my-appointments.component.scss']
})
export class MyAppointmentsComponent implements OnInit {
  appointments: any[] = [];
  filteredAppointments: any[] = [];
  loading = true;
  filterStatus = '';
  filterMode = '';
  patientId: number;
 
  statusOptions = ['', 'Pending', 'Confirmed', 'Completed', 'Cancelled', 'NoShow'];
  modeOptions = ['', 'Online', 'Offline'];
 
  constructor(private http: HttpClient, private auth: AuthService) {
    this.patientId = this.auth.getProfileId();
  }
 
  ngOnInit(): void { this.load(); }
 
  load(): void {
    this.loading = true;
    this.http.get(`${API}/appointment/my/${this.patientId}`).subscribe({
      next: (data: any) => {
        this.appointments = data;
        this.applyFilter();
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
 
  applyFilter(): void {
    this.filteredAppointments = this.appointments.filter(a => {
      const matchStatus = !this.filterStatus || a.status === this.filterStatus;
      const matchMode   = !this.filterMode   || a.mode   === this.filterMode;
      return matchStatus && matchMode;
    });
  }
 
  cancel(id: number): void {
    Swal.fire({
      title: 'Cancel Appointment?', text: 'This cannot be undone.',
      icon: 'warning', showCancelButton: true,
      confirmButtonColor: '#dc3545', confirmButtonText: 'Yes, cancel it!'
    }).then(r => {
      if (r.isConfirmed) {
        this.http.put(`${API}/appointment/${id}/status`, { status: 'Cancelled' })
          .subscribe({
            next: () => {
              Swal.fire('Cancelled!', 'Appointment has been cancelled.', 'success');
              this.load();
            },
            error: () => Swal.fire('Error', 'Failed to cancel.', 'error')
          });
      }
    });
  }
 
  getStatusClass(status: string): string {
    const m: { [k: string]: string } = {
      Pending: 'badge-warning', Confirmed: 'badge-success',
      Cancelled: 'badge-danger', Completed: 'badge-info', NoShow: 'badge-secondary'
    };
    return m[status] || 'badge-secondary';
  }
}
