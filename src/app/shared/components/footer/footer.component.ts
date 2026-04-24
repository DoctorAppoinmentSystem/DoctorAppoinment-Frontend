import { Component } from '@angular/core';
 
@Component({
  selector: 'app-footer',
  template: `
    <footer class="footer">
      <p>© {{ year }} Doctor Appointment System. All rights reserved.</p>
    </footer>
  `,
  styles: [`
    .footer {
      background: #1E3A5F; color: rgba(255,255,255,.6);
      text-align: center; padding: 16px; font-size: 13px;
    }
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
}

