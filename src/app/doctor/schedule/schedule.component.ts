// src/app/doctor/schedule/schedule.component.ts
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
 
const API = 'http://localhost:5199/api';
 
@Component({
  selector: 'app-doctor-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class DoctorScheduleComponent implements OnInit {
  appointments: any[] = [];
  todayAppts: any[] = [];
  upcomingAppts: any[] = [];
  loading = true;
  today = new Date().toDateString();
  doctorId: number;
 
  timeSlots = [
    '09:00','09:30','10:00','10:30','11:00','11:30',
    '14:00','14:30','15:00','15:30','16:00','16:30','17:00'
  ];
 
  constructor(private http: HttpClient, private auth: AuthService) {
    this.doctorId = this.auth.getProfileId();
  }
 
  ngOnInit(): void {
    this.http.get(`${API}/appointment/doctor/${this.doctorId}`).subscribe({
      next: (data: any) => {
        this.appointments = data.filter(
          (a: any) => a.status === 'Confirmed' || a.status === 'Pending'
        );
        const todayStr = new Date().toDateString();
        this.todayAppts = this.appointments.filter(
          a => new Date(a.appointmentDate).toDateString() === todayStr
        );
        this.upcomingAppts = this.appointments.filter(
          a => new Date(a.appointmentDate) > new Date()
        );
        this.loading = false;
      }
    });
  }
 
  isTimeBooked(slot: string): boolean {
    return this.todayAppts.some(a => a.appointmentTime === slot);
  }
 
  getPatientForSlot(slot: string): string {
    const appt = this.todayAppts.find(a => a.appointmentTime === slot);
    return appt ? appt.patientName : '';
  }
}

