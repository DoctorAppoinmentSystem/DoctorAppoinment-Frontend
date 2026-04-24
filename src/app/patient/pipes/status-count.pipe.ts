// src/app/patient/pipes/status-count.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({ name: 'statusCount' })
export class StatusCountPipe implements PipeTransform {
  transform(appointments: any[], status: string): number {
    if (!appointments) return 0;
    return appointments.filter(a => a.status === status).length;
  }
}
