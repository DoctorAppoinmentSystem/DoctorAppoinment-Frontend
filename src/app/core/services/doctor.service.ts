// src/app/core/services/doctor.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class DoctorService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Get all doctors (admin)
  getAllDoctors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/doctor/all`);
  }

  // Get doctor by profileId
  getDoctorById(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/doctor/${id}`);
  }

  // Get specializations
  getSpecializations(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/specialization`);
  }

  // Get available doctors for a specialization + mode + date
  getAvailableDoctors(specId: number, mode: string, date: string): Observable<any[]> {
    const params = new HttpParams()
      .set('specializationId', specId.toString())
      .set('mode', mode)
      .set('date', date);
    return this.http.get<any[]>(`${this.api}/appointment/available-doctors`, { params });
  }

  // Get doctor schedule
  getDoctorSchedule(doctorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/doctor/${doctorId}/schedule`);
  }

  // Toggle doctor availability
  toggleAvailability(doctorId: number, isAvailable: boolean): Observable<any> {
    return this.http.put(`${this.api}/doctor/${doctorId}/availability`, { isAvailable });
  }

  // Add doctor (admin)
  addDoctor(data: any): Observable<any> {
    return this.http.post(`${this.api}/auth/register/doctor`, data);
  }

  // Delete doctor (admin)
  deleteDoctor(userId: number): Observable<any> {
    return this.http.delete(`${this.api}/doctor/${userId}`);
  }
}

