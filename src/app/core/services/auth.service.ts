// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const API = 'http://localhost:5199/api';

@Injectable({ providedIn: 'root' })
export class AuthService {

  constructor(private http: HttpClient, private router: Router) {}

  loginPatient(data: any): Observable<any> {
    return this.http.post(`${API}/auth/login`, data).pipe(
      tap((res: any) => this.storeSession(res))
    );
  }

  registerPatient(data: any): Observable<any> {
    return this.http.post(`${API}/auth/register/patient`, data);
  }

  registerDoctor(data: any): Observable<any> {
    return this.http.post(`${API}/auth/register/doctor`, data);
  }

  logout(): void {
    const logoutTime = new Date().toLocaleString();
    console.log(`[Session] User logged out at: ${logoutTime}`);  // Print to console
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  private storeSession(res: any): void {
    localStorage.setItem('token',     res.token);
    localStorage.setItem('role',      res.role);
    localStorage.setItem('userId',    res.userId.toString());
    localStorage.setItem('profileId', res.profileId.toString());
    localStorage.setItem('lastActivity', Date.now().toString());
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getRole(): string {
    return localStorage.getItem('role') || '';
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  getProfileId(): number {
    return parseInt(localStorage.getItem('profileId') || '0');
  }
}