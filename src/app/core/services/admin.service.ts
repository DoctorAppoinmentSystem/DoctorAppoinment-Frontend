// src/app/core/services/admin.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Dashboard statistics
  getStatistics(): Observable<any> {
    return this.http.get<any>(`${this.api}/admin/statistics`);
  }

  // Daily summary
  getDailySummary(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/admin/daily-summary`);
  }

  // All patients
  getAllPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/admin/patients`);
  }

  // All doctors
  getAllDoctors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/admin/doctors`);
  }

  // All appointments
  getAllAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/appointment/all`);
  }

  // Delete patient
  deletePatient(userId: number): Observable<any> {
    return this.http.delete(`${this.api}/admin/patient/${userId}`);
  }

  // Delete doctor
  deleteDoctor(userId: number): Observable<any> {
    return this.http.delete(`${this.api}/admin/doctor/${userId}`);
  }

  // Get app logs
  getLogs(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/admin/logs`);
  }
}

