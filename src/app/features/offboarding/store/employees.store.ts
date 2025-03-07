import { computed, inject } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { patchState, signalStore, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { setAllEntities, updateEntity, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { debounceTime, distinctUntilChanged, map, pipe, switchMap, tap } from 'rxjs';
import { Employee } from '../../../core/models/employee.model';
import { OffboardRequest } from '../../../core/models/offboard-request.model';
import { BackendService } from '../services/backend.service';

type EmployeesState = {
  searchQuery: string,
  sort: Sort
}

const initialState: EmployeesState = {
  searchQuery: '',
  sort: {
    active: '',
    direction: ''
  }
}

export const EmployeesStore = signalStore(
  withEntities<Employee>(),
  withState(initialState),
  withComputed(({ entities: employees, searchQuery, sort }) => ({
    vmEmployees: computed((() => employees().reduce((acc: Employee[], employee) => {
      if (employee.name?.toLowerCase().includes(searchQuery()) || employee.department?.toLowerCase().includes(searchQuery())) {
        let index = acc.findIndex(_employee => sort().direction === 'asc'
          ? _employee[ sort().active as keyof Employee ] > employee[ sort().active as keyof Employee ]
          : _employee[ sort().active as keyof Employee ] < employee[ sort().active as keyof Employee ]
        );

        if (index === -1) {
          acc.push(employee);
        } else {
          acc.splice(index, 0, employee);
        }
      }
      return acc;
    }, [])))
  })),
  withMethods((store, backendService = inject(BackendService), router = inject(Router)) => ({
    offboardEmployee: rxMethod<{ id: string, employee: Partial<Employee>, requestData: OffboardRequest }>(
      pipe(
        switchMap(({ id, employee, requestData}) => backendService.offboardEmployee(id, requestData).pipe(
          map(() => patchState(store, updateEntity({ id, changes: employee }))),
          tap(() => router.navigate([ '/offboarding' ]))
        ))
      )
    ),
    updateSearchQuery: rxMethod<string>(
      pipe(
        debounceTime(300),
        distinctUntilChanged(),
        map(searchQuery => patchState(store, { searchQuery }))
      )
    ),
    updateSort(sort: Sort) {
      patchState(store, { sort })
    }
  })),
  withHooks({
    onInit(store, backendService = inject(BackendService)) {
      backendService.getEmployees().subscribe(employees => {
        patchState(store, setAllEntities(employees));
      });
    }
  })
)
