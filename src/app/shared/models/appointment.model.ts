// src/app/shared/models/appointment.model.ts
export type AppointmentStatus = 'Pending' | 'Confirmed' | 'Cancelled' | 'Completed' | 'NoShow';
export type AppointmentMode = 'Online' | 'Offline';

export interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  specializationId: number;
  patientName?: string;
  doctorName?: string;
  specializationName?: string;
  appointmentDate: string;
  appointmentTime: string;
  mode: AppointmentMode;
  status: AppointmentStatus;
  notes?: string;
  createdAt?: string;
}

export interface BookAppointmentDto {
  patientId: number;
  doctorId: number;
  specializationId: number;
  appointmentDate: string;
  appointmentTime: string;
  mode: AppointmentMode;
  notes?: string;
}

export interface DoctorAvailability {
  doctorId: number;
  doctorName: string;
  degree: string;
  experience: number;
  profilePhoto?: string;
  availableSlots: string[];
}

