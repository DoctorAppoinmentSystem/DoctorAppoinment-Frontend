// src/app/shared/loader/loader.component.ts
import { Component, Input } from '@angular/core';
 
@Component({
  selector: 'app-loader',
  template: `
    <div *ngIf="show" class="loader-overlay">
      <div class="spinner"></div>
      <p>{{ message }}</p>
    </div>
  `,
  styles: [`
    .loader-overlay {
      position:fixed; inset:0; background:rgba(255,255,255,.85);
      display:flex; flex-direction:column; align-items:center;
      justify-content:center; z-index:9999;
    }
    .spinner {
      width:48px; height:48px; border:4px solid #e0e0e0;
      border-top-color:#2E75B6; border-radius:50%;
      animation:spin .8s linear infinite; margin-bottom:16px;
    }
    @keyframes spin { to { transform:rotate(360deg); } }
    p { color:#1E3A5F; font-weight:600; }
  `]
})
export class LoaderComponent {
  @Input() show = false;
  @Input() message = 'Loading...';
}

