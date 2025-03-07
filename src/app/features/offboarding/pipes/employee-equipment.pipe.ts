import { Pipe, PipeTransform } from '@angular/core';
import { Employee } from '../../../core/models/employee.model';

@Pipe({
  name: 'employeeEquipment',
  standalone: false
})
export class EmployeeEquipmentPipe implements PipeTransform {

  transform(employee: Employee): string {
    return employee.equipments.map(equipment => equipment.name).join(', ');
  }

}
