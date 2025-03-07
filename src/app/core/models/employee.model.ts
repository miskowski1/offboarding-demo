import { EmployeeEquipment } from './employee-equipment.model';
import { EmployeeStatus } from './employee-status.model';

export interface Employee {
  id: string;
  name: string;
  department: string;
  status: EmployeeStatus;
  email: string;
  equipments: EmployeeEquipment[];
}
