import { Component } from '@angular/core';
import { BackendService } from '../../services/backend.service';
import { EmployeesStore } from '../../store/employees.store';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
  providers: [ BackendService, EmployeesStore ]
})
export class MainComponent {
}
