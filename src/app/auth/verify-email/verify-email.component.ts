// src/app/auth/verify-email/verify-email.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
 
const API = 'http://localhost:5199/api';
 
@Component({
  selector: 'app-verify-email',
  template: `
    <div class="verify-container">
      <div class="verify-card">
        <div *ngIf="loading" class="loading-state">
          <div class="spinner-large"></div>
          <h2>Verifying your email...</h2>
        </div>
        <div *ngIf="!loading && success" class="success-state">
          <div class="icon-circle success">✓</div>
          <h2>Email Verified!</h2>
          <p>Your account is now active. You can login.</p>
          <button (click)="goLogin()" class="btn-primary">Go to Login</button>
        </div>
        <div *ngIf="!loading && !success" class="error-state">
          <div class="icon-circle error">✗</div>
          <h2>Verification Failed</h2>
          <p>{{ errorMessage }}</p>
          <button (click)="goLogin()" class="btn-primary">Go to Login</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .verify-container {
      min-height:100vh; display:flex; align-items:center;
      justify-content:center;
      background:linear-gradient(135deg,#1E3A5F 0%,#2E75B6 50%,#0D6E6E 100%);
    }
    .verify-card {
      background:#fff; border-radius:16px; padding:48px 40px;
      text-align:center; min-width:360px; box-shadow:0 20px 60px rgba(0,0,0,.2);
    }
    .icon-circle {
      width:72px; height:72px; border-radius:50%; font-size:36px;
      display:flex; align-items:center; justify-content:center; margin:0 auto 20px;
    }
    .icon-circle.success { background:#d4edda; color:#155724; }
    .icon-circle.error   { background:#f8d7da; color:#721c24; }
    h2 { color:#1E3A5F; margin-bottom:10px; }
    p  { color:#666; margin-bottom:24px; }
    .btn-primary {
      background:linear-gradient(135deg,#1E3A5F,#2E75B6); color:#fff;
      border:none; padding:12px 32px; border-radius:8px; font-size:15px;
      font-weight:600; cursor:pointer;
    }
    .spinner-large {
      width:48px; height:48px; border:4px solid #e0e0e0;
      border-top-color:#2E75B6; border-radius:50%;
      animation:spin .8s linear infinite; margin:0 auto 20px;
    }
    @keyframes spin { to { transform:rotate(360deg); } }
  `]
})
export class VerifyEmailComponent implements OnInit {
  loading = true;
  success = false;
  errorMessage = 'Invalid or expired verification link.';
 
  constructor(private route: ActivatedRoute, private http: HttpClient,
              private router: Router) {}
 
  ngOnInit(): void {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (!token) {
      this.loading = false;
      return;
    }
    this.http.get(`${API}/auth/verify-email?token=${token}`).subscribe({
      next: () => { this.loading = false; this.success = true; },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Verification failed.';
      }
    });
  }
 
  goLogin(): void { this.router.navigate(['/login']); }
}

