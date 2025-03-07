import { Component, inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Employee } from '../../../../core/models/employee.model';
import { EmployeesStore } from '../../store/employees.store';

@Component({
  selector: 'app-employees-list',
  standalone: false,
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss'
})
export class EmployeesListComponent implements OnInit {
  readonly router = inject(Router);
  readonly store = inject(EmployeesStore)

  columnsToDisplay = [ 'name', 'email', 'department', 'equipment', 'status' ];
  searchFormControl = new FormControl('', { nonNullable: true });

  chooseEmployee(employee: Employee) {
    this.router.navigate([ 'offboarding', `${ employee.id }` ]);
  }

  ngOnInit() {
    this.store.updateSearchQuery(this.searchFormControl.valueChanges);
  }
}
