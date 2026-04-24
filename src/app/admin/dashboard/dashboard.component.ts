// src/app/admin/dashboard/dashboard.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import Swal from 'sweetalert2';

const API = 'http://localhost:5199/api';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  stats: any = {};
  doctors: any[] = [];
  patients: any[] = [];
  appointments: any[] = [];
  logs: any[] = [];
  activeTab = 'doctors';
  specializations: any[] = [];

  constructor(private http: HttpClient, private auth: AuthService) {}

  ngOnInit(): void {
    this.loadStats();
    this.loadSpecializations().then(() => this.loadDoctors());
    this.loadPatients();
    this.loadAppointments();
    this.loadLogs();
  }

  loadStats():        void { this.http.get(`${API}/admin/statistics`).subscribe((d: any)  => this.stats = d); }
  
  loadSpecializations(): Promise<void> {
    return new Promise((resolve) => {
      this.http.get(`${API}/specialization`).subscribe({
        next: (res: any) => {
          this.specializations = res;
          resolve();
        },
        error: () => resolve()
      });
    });
  }

  loadDoctors(): void {
    this.http.get(`${API}/admin/doctors`).subscribe((d: any) => {
      this.doctors = d.map((doctor: any) => ({
        ...doctor,
        specialization: this.getSpecializationName(doctor.specializationId)
      }));
    });
  }

  getSpecializationName(id: number): string {
    const spec = this.specializations.find(s => s.id === id);
    return spec ? spec.name : 'Unknown';
  }

  loadPatients():     void { this.http.get(`${API}/admin/patients`).subscribe((d: any)    => this.patients = d); }
  loadAppointments(): void { this.http.get(`${API}/appointment/all`).subscribe((d: any)   => this.appointments = d); }
  loadLogs():         void { 
    this.http.get(`${API}/admin/logs`).subscribe({
      next: (d: any) => this.logs = d || [],
      error: () => this.logs = []
    });
  }

  toggleDoctorStatus(id: number): void {
    this.http.put(`${API}/admin/doctors/${id}/toggle`, {}).subscribe({
      next: (res: any) => {
        Swal.fire('Updated', res.message, 'success');
        this.loadDoctors();
      }
    });
  }

  logout(): void { this.auth.logout(); }
}