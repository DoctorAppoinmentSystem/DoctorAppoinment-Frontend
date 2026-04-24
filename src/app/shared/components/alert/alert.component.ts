// src/app/shared/components/alert/alert.component.ts
import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

export type AlertType = 'success' | 'error' | 'warning' | 'info' | 'reminder';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnChanges {

  /** Message text to display */
  @Input() message = '';

  /** Alert type controls colour and icon */
  @Input() type: AlertType = 'info';

  /** Auto-dismiss after ms (0 = never) */
  @Input() autoDismiss = 0;

  /** Whether the alert is visible */
  @Input() visible = false;

  /** Emits when the user closes or auto-dismiss fires */
  @Output() closed = new EventEmitter<void>();

  private _timer: any;

  ngOnChanges(): void {
    if (this.visible && this.autoDismiss > 0) {
      clearTimeout(this._timer);
      this._timer = setTimeout(() => this.close(), this.autoDismiss);
    }
  }

  close(): void {
    this.visible = false;
    this.closed.emit();
    clearTimeout(this._timer);
  }

  get icon(): string {
    const icons: Record<AlertType, string> = {
      success:  '✅',
      error:    '❌',
      warning:  '⚠️',
      info:     'ℹ️',
      reminder: '🔔'
    };
    return icons[this.type];
  }

  get cssClass(): string {
    return `alert alert-${this.type}`;
  }
}