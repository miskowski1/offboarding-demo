import { computed, inject, Injectable, Signal, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { Sort } from '@angular/material/sort';
import { tap } from 'rxjs';
import { Employee } from '../../../core/models/employee.model';
import { OffboardRequest } from '../../../core/models/offboard-request.model';
import { BackendService } from '../services/backend.service';

@Injectable()
export class EmployeesStore {
  private employees = rxResource({
    loader: () => this.backendService.getEmployees(),
    defaultValue: []
  });
  private searchQuery = signal<string>('');
  private sort = signal<Sort>({ active: '', direction: '' });

  private readonly backendService = inject(BackendService);

  vmEmployees = computed((() => this.employees.value()?.reduce((acc: Employee[], employee) => {
      if (employee.name?.toLowerCase().includes(this.searchQuery()) || employee.department?.toLowerCase().includes(this.searchQuery())) {
        let index = acc.findIndex(_employee => this.sort().direction === 'asc'
          ? _employee[ this.sort().active as keyof Employee ] > employee[ this.sort().active as keyof Employee ]
          : _employee[ this.sort().active as keyof Employee ] < employee[ this.sort().active as keyof Employee ]
        );

        if (index === -1) {
          acc.push(employee);
        } else {
          acc.splice(index, 0, employee);
        }
      }
      return acc;
    }, []
  )));

  updateSearchQuery(query: string) {
    this.searchQuery.set(query);
  }

  updateSort(sort: Sort) {
    this.sort.set(sort);
  }

  offboardEmployee(id: string, employee: Partial<Employee>, requestData: OffboardRequest) {
    return this.backendService.offboardEmployee(id, requestData).pipe(
      tap(() => this.employees.set(this.employees.value().map(_employee => _employee.id === id ? { ..._employee, ...employee } : _employee)))
    );
  }
}
