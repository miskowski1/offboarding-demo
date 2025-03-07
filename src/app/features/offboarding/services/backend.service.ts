import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Employee } from '../../../core/models/employee.model';
import { OffboardRequest } from '../../../core/models/offboard-request.model';

@Injectable()
export class BackendService {

  private httpClient = inject(HttpClient);

  getEmployees() {
    return this.httpClient.get<Employee[]>('http://localhost:3000/employees');
  }

  getEmployee(id: string) {
    return this.httpClient.get<Employee>(`http://localhost:3000/employees/${ id }`);
  }

  offboardEmployee(id: string, data: OffboardRequest) {
    return this.httpClient.post(`http://localhost:3000/users/${ id }/offboard`, data);
  }
}
