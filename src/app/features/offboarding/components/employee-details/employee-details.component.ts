import { Component, inject, Input, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { BackendService } from '../../services/backend.service';

@Component({
  selector: 'app-employee-details',
  standalone: false,
  templateUrl: './employee-details.component.html',
  styleUrl: './employee-details.component.scss'
})
export class EmployeeDetailsComponent {
  @Input()
  set id(employeeId: string) {
    this.employeeId.set(employeeId);
  }

  employee = rxResource({
    request: () => ({ id: this.employeeId() }),
    loader: ({ request }) => this.backendService.getEmployee(request.id)
  });
  employeeId = signal('');
  opened = signal(false);

  private readonly backendService = inject(BackendService);
  private readonly router = inject(Router);

  openSidebar() {
    if (this.employee.value()?.status !== 'ACTIVE') {
      return;
    }

    this.opened.set(true);
  }

  navigateBack() {
    this.router.navigate([ '/offboarding' ]);
  }
}
