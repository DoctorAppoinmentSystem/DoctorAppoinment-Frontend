// src/app/core/interceptors/session.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

const INACTIVITY_TIMEOUT = 10 * 60 * 1000;  // 10 minutes in milliseconds

@Injectable()
export class SessionInterceptor implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const lastActivity = parseInt(localStorage.getItem('lastActivity') || '0');
    const now = Date.now();

    if (lastActivity && (now - lastActivity) > INACTIVITY_TIMEOUT) {
      const logoutTime = new Date().toLocaleString();
      console.log(`[Session] Auto-logout due to inactivity at: ${logoutTime}`);
      localStorage.clear();
      this.router.navigate(['/login']);
    } else {
      localStorage.setItem('lastActivity', now.toString());
    }

    return next.handle(req);
  }
}

