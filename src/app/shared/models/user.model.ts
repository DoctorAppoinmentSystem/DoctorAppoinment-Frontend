// src/app/shared/models/user.model.ts
export interface User {
  id: number;
  email: string;
  role: string;
  isEmailVerified: boolean;
  isActive: boolean;
  lastLogin?: string;
  createdAt?: string;
}

export interface LoginResponse {
  token: string;
  role: string;
  userId: number;
  profileId: number;
}

export interface RegisterPatientDto {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
}

export interface RegisterDoctorDto {
  name: string;
  email: string;
  password: string;
  phone?: string;
  address?: string;
  specializationId: number;
  degree: string;
  experience: number;
  mode: 'Online' | 'Offline';
}
