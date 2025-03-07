import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { Employee } from '../../../../core/models/employee.model';
import { EmployeesStore } from '../../store/employees.store';

@Component({
  selector: 'app-employees-list',
  standalone: false,
  templateUrl: './employees-list.component.html',
  styleUrl: './employees-list.component.scss'
})
export class EmployeesListComponent implements OnInit, OnDestroy {
  readonly router = inject(Router);
  readonly store = inject(EmployeesStore);

  columnsToDisplay = [ 'name', 'email', 'department', 'equipment', 'status' ];
  searchFormControl = new FormControl('', { nonNullable: true });

  private unsubscribe$ = new Subject<void>();

  chooseEmployee(employee: Employee) {
    this.router.navigate([ 'offboarding', `${ employee.id }` ]);
  }

  ngOnInit() {
    this.searchFormControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      takeUntil(this.unsubscribe$)
    ).subscribe(query => this.store.updateSearchQuery(query));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
