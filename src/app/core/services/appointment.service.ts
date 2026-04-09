// src/app/core/services/appointment.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
  private api = environment.apiUrl;

  constructor(private http: HttpClient) {}

  bookAppointment(data: any): Observable<any> {
    return this.http.post(`${this.api}/appointment/book`, data);
  }

  getPatientAppointments(patientId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/appointment/my/${patientId}`);
  }

  getDoctorAppointments(doctorId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/appointment/doctor/${doctorId}`);
  }

  getAllAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.api}/appointment/all`);
  }

  updateStatus(id: number, status: string): Observable<any> {
    return this.http.put(`${this.api}/appointment/${id}/status`, { status });
  }

  getAvailableDoctors(specId: number, mode: string, date: string): Observable<any[]> {
    const params = new HttpParams()
      .set('specializationId', specId.toString())
      .set('mode', mode)
      .set('date', date);
    return this.http.get<any[]>(`${this.api}/appointment/available-doctors`, { params });
  }
}
