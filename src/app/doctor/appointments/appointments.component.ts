// src/app/doctor/appointments/appointments.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';
 
const API = 'http://localhost:5199/api';
 
@Component({
  selector: 'app-doctor-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class DoctorAppointmentsComponent implements OnInit {
  appointments: any[] = [];
  filtered: any[] = [];
  filterStatus = '';
  loading = true;
  doctorId: number;
 
  constructor(private http: HttpClient, private auth: AuthService) {
    this.doctorId = this.auth.getProfileId();
  }
 
  ngOnInit(): void { this.load(); }
 
  load(): void {
    this.loading = true;
    this.http.get(`${API}/appointment/doctor/${this.doctorId}`).subscribe({
      next: (data: any) => {
        this.appointments = data;
        this.applyFilter();
        this.loading = false;
      },
      error: () => this.loading = false
    });
  }
 
  applyFilter(): void {
    this.filtered = this.filterStatus
      ? this.appointments.filter(a => a.status === this.filterStatus)
      : [...this.appointments];
  }
 
  updateStatus(id: number, status: string): void {
    Swal.fire({
      title: `Set status to ${status}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes'
    }).then(r => {
      if (r.isConfirmed) {
        this.http.put(`${API}/appointment/${id}/status`, { status })
          .subscribe({
            next: () => {
              Swal.fire('Done!', `Status updated to ${status}`, 'success');
              this.load();
            },
            error: (e) => Swal.fire('Error', e.error?.message || 'Failed', 'error')
          });
      }
    });
  }
 
  getStatusClass(s: string): string {
    const m: any = {
      Pending: 'badge-warning', Confirmed: 'badge-success',
      Cancelled: 'badge-danger', Completed: 'badge-info', NoShow: 'badge-secondary'
    };
    return m[s] || '';
  }
}

