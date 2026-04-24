// src/app/admin/statistics/statistics.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
 
const API = 'http://localhost:5199/api';
 
@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  stats: any = {};
  dailySummary: any = null;
  summaryDate = new Date().toISOString().split('T')[0];
  loading = true;
  summaryLoading = false;
  doctors: any[] = [];
  patients: any[] = [];
  appointments: any[] = [];
  specializations: any[] = [];

  constructor(private http: HttpClient, public auth: AuthService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    // Load all data in parallel
    Promise.all([
      this.loadDoctors(),
      this.loadPatients(),
      this.loadAppointments(),
      this.loadSpecializations()
    ]).then(() => {
      this.computeStats();
      this.loading = false;
    }).catch(() => {
      this.loading = false;
    });
  }

  loadDoctors(): Promise<void> {
    return new Promise((resolve) => {
      this.http.get(`${API}/admin/doctors`).subscribe({
        next: (data: any) => { this.doctors = data; resolve(); },
        error: () => resolve()
      });
    });
  }

  loadPatients(): Promise<void> {
    return new Promise((resolve) => {
      this.http.get(`${API}/admin/patients`).subscribe({
        next: (data: any) => { this.patients = data; resolve(); },
        error: () => resolve()
      });
    });
  }

  loadAppointments(): Promise<void> {
    return new Promise((resolve) => {
      this.http.get(`${API}/appointment/all`).subscribe({
        next: (data: any) => { this.appointments = data || []; resolve(); },
        error: () => { this.appointments = []; resolve(); }
      });
    });
  }

  loadSpecializations(): Promise<void> {
    return new Promise((resolve) => {
      this.http.get(`${API}/specialization`).subscribe({
        next: (data: any) => { this.specializations = data; resolve(); },
        error: () => resolve()
      });
    });
  }

  computeStats(): void {
    // Total counts
    this.stats.totalDoctors = this.doctors.length;
    this.stats.totalPatients = this.patients.length;
    this.stats.totalAppts = this.appointments.length;

    // Appointment status counts
    this.stats.pendingAppts = this.appointments.filter(a => a.status === 'Pending').length;
    this.stats.completedAppts = this.appointments.filter(a => a.status === 'Completed').length;
    this.stats.cancelledAppts = this.appointments.filter(a => a.status === 'Cancelled').length;

    // Doctors by specialization
    const specMap = new Map();
    this.doctors.forEach(d => {
      const specName = this.getSpecializationName(d.specializationId);
      specMap.set(specName, (specMap.get(specName) || 0) + 1);
    });
    this.stats.doctorsBySpec = Array.from(specMap.entries()).map(([specialization, count]) => ({
      specialization,
      count
    }));

    // Appointments by mode
    const modeMap = new Map();
    this.appointments.forEach(a => {
      modeMap.set(a.mode, (modeMap.get(a.mode) || 0) + 1);
    });
    this.stats.apptsByMode = Array.from(modeMap.entries()).map(([mode, count]) => ({
      mode,
      count
    }));
  }

  getSpecializationName(id: number): string {
    const spec = this.specializations.find(s => s.id === id);
    return spec ? spec.name : 'Unknown';
  }

  loadDailySummary(): void {
    this.summaryLoading = true;
    this.http.get(`${API}/admin/daily-summary?date=${this.summaryDate}`).subscribe({
      next: (data: any) => { this.dailySummary = data; this.summaryLoading = false; },
      error: () => this.summaryLoading = false
    });
  }
}
